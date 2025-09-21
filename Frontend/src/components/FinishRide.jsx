import React from "react";
import { Link } from "react-router-dom";

const FinishRide = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
          props.setFinishRidePanel(false);
        }}
        className="text-center p-1 w-[93%] absolute top-0"
      >
        <i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i>
      </h5>
      <h3 className="text-2xl font-semibold mb-5">Finish this Ride</h3>

      <div className="flex items-center justify-between p-4 border-2 border-yellow-400 rounded-lg mt-4">
        <div className="flex items-center gap-3">
          <img
            className="h-12 rounded-full object-cover w-12"
            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAlAMBIgACEQEDEQH/xAAcAAAABwEBAAAAAAAAAAAAAAAAAgMEBQYHAQj/xAA5EAABAwIEAwUGBQQCAwAAAAABAgMRAAQFEiExBkFREyJhcYEUMkKRobEHI8HR8BUzUuFDciRigv/EABkBAAIDAQAAAAAAAAAAAAAAAAAEAQIDBf/EACQRAAIDAAICAgEFAAAAAAAAAAABAgMRBBIhMTJBIhMUIzNC/9oADAMBAAIRAxEAPwCwBOm9KI1mZooHeSekiKUQNBO/MVUkUKRsNaMlMJ0EUWCNutGO+p0qCARGtR+N4xbYNYLurpUxo22PecVySKfSE/FJFY5+JmJu3fErloskMWgSltM6SQCpX1j0qUBGY1j13jN2q4vrgpUCQhoE5Gx0A/XnXWUg24X26FrJzBC4Tm08d9qjEsFxspbcIISVK/1STDiy4kJBJTz50Fh6bi4fuSg2XbEK1bTOg8I286kr9o2r6RmyhBCQc3eaJ55uUfw02v79pi4d/p5Cu0QnM7l5x3v54US1tcQurdx4W6321GFTJExv41VtL2WjFv0azwVxCcYZdtbw5ry1gLV/mk7Hz01/3VojTvRM1i3D93eYHi1rfXDSw2+4WlZhGcmB61tSIcbSYIBAiamL0rKLT8nDoJpIyDPWlygQI1oqkbCpKiKiSda4UnfNHnSwGmlEKJOpkUAJ76oj1rhFKdmK6UwmgBKKFH0oUAI5SNRSiU86Cc/+KZ560ZMlQlMetBIolJo4bFdAigZoIElNJCpGnlXn7i7tk8VYmXVArFwT4Hp9Ir0IvUa1i34p4cqz4pXcx+XeNpcSfEAAj6D50AVa3ldwChJMaxUzg2GOu3KXUoM5j3d6jMKcy3aEjXMYitF4fLVulS3VNtjdRVoAPOl7rJR8Ib49cZeWSHD/AAFZvQ/eAa7IB+9Xj+i2dvZBhhlKW0j3ANKjMFx3Ce1DDeJWalDdAeSSKsLt5bIZW4XUlHM9KX8yX5DDWP8AEofGOFN32DvWyEBJSM7eUe6oag1O8M3K3+GsOurg5nV2yFLnrHSoe9xdy+dUMMwu6fZmC6spbBHgFGT8qneGrYJwGza747NoIIOhEaa1txuyWMw5WPGiST3hMUVW502pVLfZzl59aT3EydaaEwpA5UmRSpGlJkgb0AEO9F1Gs+dGPMUUyTlCT51IHMoOpoVwgjr8q7QBwEzod6M0SdT5UjnSRqNP3o7ECdSfM1GEjvlRSdq6ToKAE0EHNQRI0rO/xeSh21sGQj88KUtKo2A0g+c1owSImqp+INh2tsxf5SUWxKXI5IUIn0MfOqzbS1F60nLGY7gwDd6S5oUjTwNWi2w+5Ulu5etvaC5HZNuglsGdyAddKqzX5F5lUQOWlalwVftvttMLV3WwN+dL3N6pIcoS8xDowH2/Bgu+U2LlBlKra0DaEJ8JE5vU0+4YLt3gVxYXZKnmzkUoKgkfz7VYuJsSssOwR24gSluQOpqocM4vhDOKBP8AUW1KdEx9x51hJykxqCikOLfhRtkuZGp7VSVFQfWSkjaOm9WzBEKRbOtqJKg6SdetRF1xDa2KlGyuWlkLjItWpHhUnhV+Li+dQkZVLZ7Qp6QQP1rSlvv5MORFfp+CScSe9E7U2ZnIAogkTTzLCpzH9KRQkZB606c0SXPwiaIEzTgiKIU9akBEorhTAgaUtloFOlADYpoU4yUKMAhELkkTppFOmIClqnVWtRzPdk6ztvSzTpEx0qCSVzyB5Uds00QolKfKnDW9SQOAO7XCPAHzo6RQUOe1AGM/i3hVvh+I2d1aMIaTcJIcCBAzDn6g/SmfBd80m9ZQ+4W8ygDlOwJq4fi+025g9rm0cDxyD03rImXHGHSQSlU6nrWc4qSw1rm4vTQ8TveIcTfeW22pNi26plIBAKiBznqNanOFOBGs/tNy7YqhAELWpYVJI2EbCo/gvHrTErJzDrpSUrUuRn3kgfaKuNnhmK2MpsHmwkmCTyHWl9x5g/DrKOp+St45wPbdndtWVwltLLWdKkM5e/PU6xU1wEhy6vsRxEqKmEZbVhX+QTqT84pfi1Ttlw3eAXJdvHQEIy7lStAKsPD2FowfBbSyRqWmxmUd1K3JPmavUm3rF+TJfFDwphBpJCfyx605I7sUkgd0JPKmRMTInlXCilykfw0MtADfJXCinBTXMtACITFcpUp1rtSBT05wrKUaHnOxpZIyiUiT0oiloChn856UZK0yMpJmqEjhTriPcQV+W9LWt0VPhpbcLnkeVJsqzERtzpy1AUJby7j61KAkWwaaYlithhaEqv7hLIWYTOpJ8hrHjTXHMetcFtu/CrlQltkGZ8T4eNZlf3NzjFwm8xBzOue7AjKncJTHL/db11OZnKaiF42vLrGr4Xa2nUWraezaSZgjmqNgSfsKgn8BNy12jOiyJ86sNniDtg4ba5Ql61d+FYhKgeXgR1qx4dhNpeMqXhrmYIPeZV7yPPw8aT5FVtMt9odonVZHr9mSKw++tHgoNqCkbKTp61d8A4u4pUgsNWj10sCESCD6mrUcBU4g/kifKn3D2CLs3luuKGXkiKwd2+0aqjq9ixPhfhjHLzEWcV4pdbSlshxm0QqRMaFR25+NX1QI+H61nFlxVfYLfv2qle023aqCULOqddgf02qetuOrF1P/AJNs80QJJRCh+ldBUyS1HPlbrxss8aVzKCdqj8Lx/C8WPZ2d6hboE9kuUrjyOpqV+KIE1Rpr2Ss+hPIOgoZY15UpE0QJIXzkjQTQAUpmjZa5JHvAjzpcI0FSA3KKFLlFCgDPlO5VSSYjp/P4aAdGedBJBqIfuVLBCVHkJHKndmuEJB2nQEaiqEk5aSSpRHLltTLiDHm8DtJCkruXQSw2Tqecnw1py0uIOgjUmsmxvFji+NXV0CezC1IaTOyEmB89T61pXHsysniHttiDuJNKvr0qVdKUcxnU67DoIO1SrAQ82QoFPJKiNDUJhicwynQFU1Y7JMAJkRtvXSisWCjejN+0SpHYuahWiTSdhc3FlcpGdTb7f9t1JjMKlLpjM0S2QhQ2Cj3T60xfY9sYzpCkPIOxGqSOtS0msZG49LphPGaA2G8Vtwon/lZTBPmn9ql18Q4F7Kp9N0EkD+2UnN5RWZ2rguW1EiHEGFDmDSiQrVBUQU7Gk58CmT30NR5lkVgXEFe0vuvNyla3FOonkZ0ogV2jaHUSkq1/6nmKMUkLBI1neutJKCtG4JmKbjFRSSFpNyesY3inbd1vELZJS/bqzKSgwVD4v3FadwbxU3iTKLa/dAuY/LdUQA8DqPCaoC0yddxoT4UytptkJbBjKSI8iTVJ1KZMZtG9JEnSuLEkjSY261D8H4uMXwwdoR7Qz3XY59Fev3qdCZ2iY0PWufKLi8Gk9QkpGmaDqRM0s2mUGiJSVAFcyNtKWYEhSem9QiQBAihSqU/yKFSBizIQ8hKlJCgRIJII/n7VKWLQLadREAjnTRkpBgR3do6RUk3nbbHZpC/M5QPpVCwljjhscBxC6SSShhRHnBrGbNWVZTPhWuce3KLfg+6zAhb2VtIB3Kj+wNY8ysJczDnW1TxmcvKLThriQsJ5RVjtk5gCkDrtVRsHIWlQjfnVotX0pSkOZmY2XunXrXQT8CrWEmkrAhPe6zrUfdr7J1K2kQpXdUg7Hp+3rUil0hILqAWzs42ZHqKQvWkOsqUkj/sKsQMb5n2d5N82O7EPJHxInfzG9LvNd7Ny0J8RSjaQu3DakJAKYKTr5ihZArsW0qOYp7snoDFADR+EJnlI50c6LCqGIoys67SKWSkFCZ6UAJFINMHxDyYTv18qlFCNhUZf50vNp05nwoIaLDwXiAscbt1uOFLKpQ701BifWDWt5QRJVy3j7VhTWjfxEczNbNwlejFMBtnJGdsdktMkkEbT4kQfWlOTFeJIYpeod3CiFISYzKIA8edOrZPvafXWj9kFGVQT4iaOG4g6A/OlEbA7MHeu0oBptPrQqQMSat2mFqU2gBS4KjHvcqeodRk/uKQEmTTJbhSZOunKghwbKOkmazLjHjd4YnwspTKZWytLsDwlKvoSay4e8I25VqFkkLTd26h+W5mUP/rf6zWZFvsLlxhYgtOFJB5Qa0gykiVsHuyhS0FxiO8ANU1bcLCXGA7bOh5nw1MdD4iqjYq7NQzBSeeYaj1qfsWAlxFzbOKZcJGZbZiR4jY10K/QrJFkYYSFFbClNK55dUnzSdK660syqMh5kHuq/ajWbjiiQ8lBXzWnSafBCSJAnw5VoUIhCiklJGUp3Fdt0lDaBy+L1qRvMPddYU6wyqUanKjcUxaIUkpnWKNT9MGmhrjkpw5w/wCBBn1pcGIPVIpDGzOBXK4/4j8xTlMEN6alA+1BIkR5/OmK8PxDFb5tmwt1OZJKlyEgT1JqRVzpbh9Vzc42vD2szTDrYU48NJ5EA9aw5Nrqr7R9m3HqVk+rJnhbhtEKvcUUlxponIEaoMc55+FWLCbx5jEV3bLaja9nkWhKhsCSD56mnL1ql9tnD2FZGGoKwNJ6elNrttLwWw2CzZI/uHYujnryTXDnfOc+zZ14UwjHrhc2XEutIcTOVaQRpSkzsmq3w7fIC1MJS6LRRCWHFnQ+U6x+1WVI0pyuamtEbIODw5P/AK12gaFXKGCuPJ0BPe5jpRvcBG4Apu6c6xlKpBnalW1iNd+dZlxZhKQvQEdwDQVR+N7D2TFU3qB+XcDvafEN/wBD86uzBJeVvlAimvEWH/1PCHW0Adokdo2eqgCfrtUxeMhlKwhXaJ7NRkjbpFWSwsn33gwwyVOEEQnceJ8PGqMzdu27aTbqUhyIzgDarfwrjirUJUhZh094k6g1tZyZVQ/FaRVx42SyTw0zCuFlKYaOIXKWTABQ3qo+tWuwwnDbVI7K2C1j43e8f2+lVvCcSS+2nvTtVns3gY51zJcy2x+WPviVwXhDxzNGUaDpGlZ9xdgisPUvFMPaKmB3nmUjbxSP0rR0AODURSNzbgpIPSNportspn3i9M5whNdWYFjmNsi2uLENL7NZ7NTpEFEidtzofv0q0jCMQct2H2LRTjam05VIUkhQjcGadfiBwsm4t/6iy1mLRCLtA0K2+S56p6+Jqw8Aptn8CVatKyN2ightKl5iEwCNfnT3721x7RMnxq08ZUHMLxFIGeye+U/aleGU3NoXH79D6Flw5Gi2YbT8vCfWtFDSYlSUyT1muKtULBBSOesUlfzLLo9ZLBmjj10y7IgmcZQwF5WXnSpU6II+prtxiNzdtpSLRtLQ1yKcmT1NSL+HoAkAbdKaqtg0iRvNIuUhxKL8kXiN/ibrjKvymm2RIyTOYcya0TCrr27D2LojvOIBI6HnWd3iVqBirpwY6F4Ihs+8yooI+v605wrG5NMV5sF0TRNHN/jQrpGvP5UK6JzTz24T2p13J+wo7ZjXoaFCsy46Z7pXA5T60utRCUnq4EmehIoUKEBk2JtpbvrltM5UurA+ddwlxTd6lsHuuA5gfAGhQq8/iEPkjR+F7t6Q3m7vSr9hz68o150KFcaXyOz/AJRZ7J1SompHKFo7woUKYh6EbSKxBpJac3GZJQrxB3FVxGB2eEWr6sPLzRcyqV+YSDE9fOhQrLX5RrH6Yvw/fPXNsku5SVEgwKlloyoLgUrNMb0KFUXo3l7Gjj69RI0pk5cOFJEjf9K5QqJExElAKIBGh/YVYeCtEXo5BxP2oUK24f8AYYct/wAZZqFChXVOWf/Z"
            alt=""
          />
          <h2 className="text-lg font-medium">Harsh Patel</h2>
        </div>
        <h5 className="text-lg font-semibold">2.5 KM</h5>
      </div>

      <div className="flex justify-between gap-2 flex-col items-center"></div>
      <div className="w-full mt-5">
        <div className="flex items-center gap-5 p-3 border-gray-200 border-b-2">
          <i className="text-lg ri-map-pin-2-fill"></i>
          <div>
            <h3 className="text-lg font-medium">556/11-4</h3>
            <p className="text-sm -mt-1 text-gray-600">Water foll, Kullu</p>
          </div>
        </div>
        <div className="flex items-center gap-5 p-3 border-gray-200 border-b-2">
          <i className="text-lg ri-map-pin-2-fill"></i>
          <div>
            <h3 className="text-lg font-medium">556/11-4</h3>
            <p className="text-sm -mt-1 text-gray-600">Water foll, Kullu</p>
          </div>
        </div>
        <div className="flex items-center gap-5 p-3">
          <i className="text-lg ri-currency-line"></i>
          <div>
            <h3 className="text-lg font-medium">Rs.300</h3>
            <p className="text-sm -mt-1 text-gray-600">Cash cash</p>
          </div>
        </div>
      </div>
      <div className="mt-6 w-full">
        <Link
          to="/captain-home"
          className="mt-10 w-full flex justify-center bg-green-600 text-lg text-white font-semibold p-3 rounded-lg"
        >
          Finish Ride
        </Link>
      </div>
    </div>
  );
};

export default FinishRide;
