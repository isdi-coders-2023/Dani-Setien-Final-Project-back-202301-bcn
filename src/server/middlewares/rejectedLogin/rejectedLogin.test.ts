import { CustomError } from "../../../CustomError/CustomError";
import { mockNext } from "../../../mocks/mocks";
import { rejectedLogin } from "./rejectedLogin";

describe("Given a rejectedLogin function", () => {
  describe("When it is called with a rejection reason 'password'", () => {
    test("Then it should pass on an error that includes the rejection reason 'password'", () => {
      const reasonForRejection = "password";

      const invalidUsernamePassword = new CustomError(
        `Invalid ${reasonForRejection}.`,
        401,
        "The combination loginname and password is incorrect, please try again."
      );

      rejectedLogin(reasonForRejection, mockNext);

      expect(mockNext).toHaveBeenCalledWith(invalidUsernamePassword);
    });
  });
});
