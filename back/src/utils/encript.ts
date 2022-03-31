import bcrypt from "bcrypt";

class Utils {
  private static _saltRounds = 10;

  static encriptPassword = async (password: string): Promise<string> => {
    const hash = await bcrypt.hash(password, this._saltRounds);
    return hash;
  };

  static comparePassword = async (
      candidatePassword: string,
      currentPassword: string,
      callback: (err: Error | null, same: boolean | null) => void) => {
    bcrypt.compare(candidatePassword, currentPassword, function(error, isMatch) {
      if (error) {
        return callback(error, null);
      }
      callback(null, isMatch);
    });
  };
}

export default Utils;
