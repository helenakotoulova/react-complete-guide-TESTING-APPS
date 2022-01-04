import { render, screen } from "@testing-library/react";
import Async from "./Async";

describe("Async component", () => {
  test("renders posts if request succeeds", async () => {
    window.fetch = jest.fn(); // takhle overwritujeme tu fetch fci pomoci mock fce
    window.fetch.mockResolvedValueOnce({
        json: async () => [{id: 'p1', title: 'First post'}]
    })
    render(<Async />);
    // act - nothing
    //assert: - listItemElements bude array a expectujeme, ze neni prazdny (tedy ze jeho delka NENI 0)
    // takhle nam to ale hodi eror: unable to find an accessible elemnt with the role 'listitem'. A to proto, ze on je hleda OKAMZITE. ale my mame asynchronni komponentu
    // a ty posts jsou initially empty. tzn nejdriv se to renderuje s prazdnym posts. pak probehne ten useEffect a az se to fetchne tak uz posts prazdne nejsou
    //const listItemElements = screen.getAllByRole('listitem'); // dame getallbyRole. kdybychom dali jen getByRole, tak to failne, protoze ja tam budu mit vicekrat <li></li>.
    // proto pouzijeme findAllByRole - coz je metoda ktere returnuje promise
    const listItemElements = await screen.findAllByRole("listitem"); // react testing lib will reevaluate the screen until this method succeds. ma property timeout, ktera je default 1s (po te se to reevaluatuje znovu)
    // pridame async do testovaci funkce a pak muzeme awaitovat promise (radek nad timhle radkem)
    expect(listItemElements).not.toHaveLength(0);
  });
});

/*
// act - nothing
        //assert: - listItemElements bude array a expectujeme, ze neni prazdny (tedy ze jeho delka NENI 0)
        // takhle nam to ale hodi eror: unable to find an accessible elemnt with the role 'listitem'. A to proto, ze on je hleda OKAMZITE. ale my mame asynchronni komponentu
        // a ty posts jsou initially empty. tzn nejdriv se to renderuje s prazdnym posts. pak probehne ten useEffect a az se to fetchne tak uz posts prazdne nejsou 
        //const listItemElements = screen.getAllByRole('listitem'); // dame getallbyRole. kdybychom dali jen getByRole, tak to failne, protoze ja tam budu mit vicekrat <li></li>.
        // proto pouzijeme findAllByRole - coz je metoda ktere returnuje promise
        const listItemElements = await screen.findAllByRole('listitem'); // react testing lib will reevaluate the screen until this method succeds. ma property timeout, ktera je default 1s (po te se to reevaluatuje znovu)
        // pridame async do testovaci funkce a pak muzeme awaitovat promise (radek nad timhle radkem)
        expect(listItemElements).not.toHaveLength(0);
Takhle jsme to meli, ale neni to uplne ok, takhle totiz testujeme,jestli fugnguje ta fetch fce, 
ale to vlastne neni nase fce, ale je to fce browseru. tu testovat nechceme, my chceme testovat tu komponentu, jestli funguje.
proto tam misto te fetchovaci fce dame nejakou mock funckci. abychom nefetchovali data z netu.

*/
