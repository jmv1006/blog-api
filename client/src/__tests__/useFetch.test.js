import useFetch from "../hooks/useFetch";

test("custom hook returns parameter", () => {
    expect(useFetch('test.com', 'POST')).toBe('test.com')
}) 