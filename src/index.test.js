import { toBeInTheDocument, toHaveClass } from "@testing-library/jest-dom";
expect.extend({ toBeInTheDocument, toHaveClass });

import {
  getByLabelText,
  getByText,
  getByTestId,
  queryByTestId,
  wait,
  waitForDomChange,
  // fireEvent,
  querySelector
} from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";

beforeEach(() => {
  var html = require("fs")
    .readFileSync("./index.html")
    .toString();
  global.document.documentElement.innerHTML = html;

  require("./index");
});

it("renders_container", () => {
  expect(document.getElementById("board")).toBeInTheDocument();
});

it("renders_table", async () => {
  waitForDomChange();

  console.log(global.document.documentElement.innerHTML);
  console.log(document.documentElement.innerHTML);

  expect(document.documentElement.getElementsByTagName("td").length).toEqual(
    5 * 5
  );
});

// it("reacts_on_click", async () => {
//   waitForDomChange({ document })
//       .then(() => console.log('DOM changed!'))
//       .catch(err => console.log(`Error you need to deal with: ${err}`));

//   fireEvent(
//     document.documentElement.getElementsByTagName('td')[0],
//     new MouseEvent('click')
//   );

//   waitForDomChange({ document })
//       .then(() => console.log('DOM changed!'))
//       .catch(err => console.log(`Error you need to deal with: ${err}`));

//   expect(
//     document.documentElement.getElementsByTagName('td')[0].innerText,
//   ).toEqual('x');
// });
