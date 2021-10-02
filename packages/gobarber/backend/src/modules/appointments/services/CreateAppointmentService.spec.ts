interface ITeste {
  exemplo: number;
}
test('Should be able sum two number', () => {
  const temp: ITeste = { exemplo: 3 };
  expect(1 + 2).toBe(temp.exemplo);
});
