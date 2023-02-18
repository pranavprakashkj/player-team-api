function verifyRoute(req, res, next) {
  const bearerHead = req.headers.authorization;

  if (typeof bearerHead === "undefined") {
    res
      .status(401)
      .send({ message: "No bearer token found in authorization header" });
    return;
  }

  const bearerToken = bearerHead.split(" ")[1];
  if (
    bearerToken !==
    "SkFabTZibXE1aE14ckpQUUxHc2dnQ2RzdlFRTTM2NFE2cGI4d3RQNjZmdEFITmdBQkE="
  ) {
    res.status(401).send({ message: `Invalid bearer token` });
    return;
  } else {
    next();
  }

  // /////////////////////////////////////////////////////////////////////////////
  //   If it a JWT token, use below.
  //
  // import jsonWebToken from "jsonwebtoken";
  // jsonWebToken.verify(
  //     bearerToken,
  //     process.env.SECRET_KEY,
  //     (error, decoded) => {
  //       if (error) return null;
  //       else return decoded.userid;
  //     }
  // )
  // /////////////////////////////////////////////////////////////////////////////
}
export default verifyRoute;
