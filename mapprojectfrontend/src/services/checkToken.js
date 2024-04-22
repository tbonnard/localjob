import jwt_decode from "jwt-decode";

export function isCookieExpired() {

    function check_cookie_name(name) {

        const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        if (match) {
            // console.log(match)
            return match
        }
        else {
            return false
        }   
    }
    
    const token = check_cookie_name("jwtTk")
    if (!token) {
        return false
    }

    let decodedToken = jwt_decode(`${token}`);
    // console.log("Decoded Token", decodedToken);
    let currentDate = new Date();
    // console.log(decodedToken.exp)
    
    // const birthday = new Date(1970, 0, 1);
    // console.log(birthday)
    // console.log(birthday.getTime())


    // JWT exp is in seconds
    if (decodedToken.exp * 1000 < currentDate.getTime() && decodedToken.exp * 1000 > 0 ) {
    //   console.log("Token expired.");
    document.cookie = "jwtTk=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/ ;SameSite=Lax";

      return true
    } else {
    //   console.log("Valid token");   
      return false
    }

}
