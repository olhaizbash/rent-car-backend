require("dotenv").config();
const { BACKEND } = process.env;

const registrationMessage = (newUser) => {
  return `<div
    style="
      font-family: 'Arial', sans-serif;
      max-width: 600px;
      margin: 0 auto;
      text-align: center;
      padding: 20px;
      background: linear-gradient(to right, #000203, #363535);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    ">
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="80"
      height="80"
      viewBox="0 0 32 32">
      <title>car</title>
      <path
        fill="rgba(255, 95, 0, 1)"
        d="M31.249 11h-3.742l-1.040-2.6c-1.069-2.673-3.619-4.4-6.499-4.4h-7.938c-2.879 0-5.43 1.727-6.499 4.4l-1.040 2.6h-3.741c-0.488 0-0.846 0.459-0.728 0.932l0.375 1.5c0.083 0.334 0.383 0.568 0.728 0.568h1.254c-0.839 0.733-1.38 1.799-1.38 3v3c0 1.008 0.385 1.917 1 2.621v3.379c0 1.104 0.896 2 2 2h2c1.104 0 2-0.896 2-2v-2h16v2c0 1.104 0.896 2 2 2h2c1.104 0 2-0.896 2-2v-3.379c0.615-0.703 1-1.613 1-2.621v-3c0-1.201-0.541-2.267-1.379-3h1.254c0.344 0 0.644-0.234 0.727-0.568l0.375-1.5c0.118-0.473-0.24-0.932-0.728-0.932zM9.246 9.886c0.456-1.139 1.559-1.886 2.786-1.886h7.938c1.227 0 2.33 0.747 2.786 1.886l1.246 3.114h-16zM6 19.988c-1.2 0-2-0.797-2-1.994s0.8-1.994 2-1.994 3 1.794 3 2.991-1.8 0.997-3 0.997zM26 19.988c-1.2 0-3 0.199-3-0.997s1.8-2.991 3-2.991 2 0.797 2 1.994-0.8 1.994-2 1.994z"></path>
    </svg>
    <div style="color: #fff; font-size: 10px; border-bottom: 1px solid #fff">
      <p>DON'T RENT A CAR. RENT THE CAR.</p>
      <p>Premium car rental at affordable rates. Worldwide.</p>
    </div>
    <h1 style="color: #fff; margin-bottom: 15px; font-size: 32px">
      Welcome to RentCar!
    </h1>
    <p style="font-size: 20px; color: #fff; line-height: 1.5">
      Please, confirm your email address:
    </p>
    <a
      style="
        display: inline-block;
        margin: 15px 0;
        padding: 15px 25px;
        font-size: 20px;
        color: #fff;
        background-color: rgba(255, 95, 0, 1);
        text-decoration: none;
        border-radius: 10px;
        transition: background 0.3s, color 0.3s;
        text-transform: uppercase;
        letter-spacing: 1px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      "
      target="_blank"
      href="${BACKEND}/auth/verify/${newUser.verificationToken}">
      CONFIRM
    </a>
  
    <p
      style="
        font-size: 16px;
        color: #fff;
        line-height: 1.5;
        margin-top: 20px;
        margin-bottom: 20px;
      ">
      Premium vehicles without premium prices. We have over 222,000 rental
      vehicles in our fleet, which hosts models from some of the best car
      manufacturers in the world, including German favorites such as BMW,
      Mercedes, Audi and more.
    </p>
  
    <p style="font-size: 12px; color: #fff">
      We wish you a productive journey<br /><b>RentCar</b>
    </p>
    <ul
      style="
        display: flex;
        gap: 20px;
        justify-content: center;
        list-style: none;
        padding: 0;
      ">
      <li>
        <a href="http://www.linkedin.com/in/olha-izbash">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 32 32">
            <title>instagram</title>
            <path
              fill="#fff"
              d="M29 0h-26c-1.65 0-3 1.35-3 3v26c0 1.65 1.35 3 3 3h26c1.65 0 3-1.35 3-3v-26c0-1.65-1.35-3-3-3zM12 26h-4v-14h4v14zM10 10c-1.106 0-2-0.894-2-2s0.894-2 2-2c1.106 0 2 0.894 2 2s-0.894 2-2 2zM26 26h-4v-8c0-1.106-0.894-2-2-2s-2 0.894-2 2v8h-4v-14h4v2.481c0.825-1.131 2.087-2.481 3.5-2.481 2.488 0 4.5 2.238 4.5 5v9z"></path>
          </svg>
        </a>
      </li>
    </ul>
  </div>`;
};

module.exports = registrationMessage;
