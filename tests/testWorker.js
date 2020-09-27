const longComputation = ({a,b}) => {
  return a + b;
};

process.on('message', (data) => {
  const sum = longComputation(data);
  process.send(sum);
});
