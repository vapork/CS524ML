const querystring = require("querystring");
const http = require("http");

const mean_of_features = [
  5.44628099e1,
  6.57024793e-1,
  9.91735537e-1,
  1.30359504e2,
  2.46842975e2,
  1.28099174e-1,
  5.53719008e-1,
  1.50115702e2,
  3.14049587e-1,
  1.01322314,
  1.4214876,
  6.81818182e-1,
  2.30165289,
];

const variance = [
  8.43725838e1,
  2.25343214e-1,
  1.04125401,
  2.82040178e2,
  2.77584311e3,
  1.11689775e-1,
  2.80172119e-1,
  4.97565125e2,
  2.15422444e-1,
  1.21065159,
  3.67802746e-1,
  9.77272727e-1,
  3.51154293e-1,
];

const weights = [
  -0.09005275,
  -0.7291416,
  0.6598856,
  -0.25411126,
  -0.1614455,
  0.1166103,
  0.24034064,
  0.46880907,
  -0.49103144,
  -0.7343311,
  0.30284047,
  -0.6067721,
  -0.55872846,
];

const bias = 0.16516548;

exports.handler = async (event) => {
  var post_data = JSON.parse(event.body);

  let result = 0;
  let index = 0;

  for (let i in post_data) {
    result =
      result +
      ((post_data[i] - mean_of_features[index]) / Math.sqrt(variance[index])) *
        weights[index];

    index++;
  }

  result = result + bias;

  result = 1 / (1 + Math.exp(-1 * result));

  if (result > 0.5) {
    result = "HeartAttack Predicted!";
  } else {
    result = "No HeartAttack Predicted!";
  }

  const response = {
    statusCode: 200,
    body: result,
  };
  return response;
};
