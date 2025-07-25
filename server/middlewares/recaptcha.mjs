import axios from "axios";

export const recaptcha = async (req, res, next) => {
  const { recaptchaToken } = req.body;
  if (!recaptchaToken) {
    return res.status(400).json({ message: "reCAPTCHA token is required." });
  }

  try {
    const response = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_KEY,
        response: recaptchaToken,
      })
    );

    const data = response.data;
    console.log("RECAPTCHA DATA: ", data);

    if (!data.success) {
      return res.status(400).json({
        message: "reCAPTCHA verification failed. Please refresh and try again.",
        isSuccess: false,
        isHuman: false,
      });
    }

    if (data.score < 0.7) {
      return res.status(403).json({
        message:
          "Suspicious activity detected. If you're human, please try again.",
        isSuccess: false,
        isHuman: false,
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      message:
        "An error occured while veryfing reCAPTCHA. Please try again later.",
      error: error.message,
      isSuccess: false,
      isHuman: false,
      error: true,
    });
  }
};
