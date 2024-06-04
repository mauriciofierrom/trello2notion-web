import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { UserContext } from "./UserProvider";
import { BrowserRouter } from "react-router-dom";
import { Markdown } from "./markdown";
import authgear from "@authgear/web";

test("renders file input", () => {
  render(
    <UserContext.Provider value={{ isLoggedIn: true, email: "some@some.com" }}>
      <BrowserRouter>
        <Markdown />
      </BrowserRouter>
    </UserContext.Provider>,
  );

  const fileInput = screen.getByLabelText("Export file");
  expect(fileInput).toBeInTheDocument();
});

describe("upload", () => {
  test("when the file is greater than 10 MB", async () => {
    render(
      <UserContext.Provider
        value={{ isLoggedIn: true, email: "some@some.com" }}
      >
        <BrowserRouter>
          <Markdown />
        </BrowserRouter>
      </UserContext.Provider>,
    );

    withFile({
      size: 11,
      cb: (file: File) => {
        const fileInput = screen.getByLabelText("Export file");
        fireEvent.change(fileInput, { target: { files: [file] } });
      },
    });

    expect(screen.getByText(/File is larger than 10 MB/i)).toBeInTheDocument();
  });

  test("when changing the file", () => {
    render(
      <UserContext.Provider
        value={{ isLoggedIn: true, email: "some@some.com" }}
      >
        <BrowserRouter>
          <Markdown />
        </BrowserRouter>
      </UserContext.Provider>,
    );

    const fileInput = screen.getByLabelText("Export file");

    withFile({
      size: 3,
      type: "application/xml",
      cb: (file: File) => {
        fireEvent.change(fileInput, { target: { files: [file] } });

        expect(
          screen.getByText(
            /File is not supported. Please upload a JSON file./i,
          ),
        ).toBeInTheDocument();
      },
    });

    withFile({
      size: 3,
      cb: (file: File) => {
        fireEvent.change(fileInput, { target: { files: [file] } });

        expect(
          screen.queryByText(
            /File is not supported. Please upload a JSON file./i,
          ),
        ).not.toBeInTheDocument();
      },
    });
  });

  test("when the request succeeds", async () => {
    jest.clearAllMocks();
    authgear.fetch = jest.fn().mockReturnValue({});

    render(
      <UserContext.Provider
        value={{ isLoggedIn: true, email: "some@some.com" }}
      >
        <BrowserRouter>
          <Markdown />
        </BrowserRouter>
      </UserContext.Provider>,
    );

    const fileInput = screen.getByLabelText("Export file");
    const submitButton = screen.getByRole("button");

    const file = new File(["some"], "board.json", { type: "application/json" });

    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(submitButton).toBeEnabled();
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(/Your export file is been converted/i),
      ).toBeInTheDocument();
    });
  });
});

const createMockFile = (name: string, type: string, size: number) => {
  global.File = jest.fn((file, fileName) => ({
    name: name,
    type: type,
    size: 1024 * 1024 * size,
    lastModified: new Date().getMilliseconds(),
    webkitRelativePath: "",
    text: jest.fn(),
    arrayBuffer: jest.fn(),
    slice: jest.fn(),
    stream: jest.fn(),
  }));

  const file = new File(["something"], "board.json");

  return file;
};

interface WithFileOptions {
  name?: string;
  type?: string;
  size: number;
  cb: (file: File) => void;
}
const withFile = (options: WithFileOptions): void => {
  const prevFile = global.File;

  const { cb, size, name = "board.json", type = "application/json" } = options;

  const file = createMockFile(name, type, size);

  cb(file);

  global.File = prevFile;
};
