// import Razorpay from "razorpay"


export const API_BASE_URL = import.meta.env.VITE_API_URL

// export const razorpay = new Razorpay(
//     {
//         key_id: import.meta.env.RAZORPAY_KEY_ID,
//         key_secret: import.meta.env.RAZORPAY_KEY_SECRET
//     })

export const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
};
