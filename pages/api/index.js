// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import apiResponse from "./common/api-response";

export default function handler(req, res) {
  return apiResponse(res, 200, "Welcome to Bike APIs!", null);
}
