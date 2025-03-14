import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input, FormControl, FormErrorMessage } from "@chakra-ui/react";
import signIn from "../firebase/signin";
import Triangle from "../assets/bg-triangle-ellipse@2x.png"

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const Signin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setShowError(false);
    const { id, value } = event.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  const goback = () => {
    navigate("/")
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowError(false);
    await signIn(formData.email, formData.password).then(res => {
      if (!res.error)
        goback();
      else {
        setShowError(true);
        setErrorMessage(res.error);
      }
    }
    )
  };

  return (
    <div>
      <div className="h-screen w-[1vh] absolute left-0" style={{
        backgroundImage: "linear-gradient(to bottom, #1F396E, #1D0021)"
      }}></div>
      <div className="form-container" style={{backgroundImage: `url(${Triangle})`, backgroundSize:"20%", backgroundRepeat: 'no-repeat', backgroundPosition: 'right bottom'}}>
        <div className="p-20 h-screen">
          <div className="max-w-[600px] mt-40 max-sm:mt-10" style={{}}>
            <h1 className="text-4xl sm:text-4xl mb-8" style={{ fontWeight: 'bold' }}>
              Let's Sign you in!
            </h1>
            <form className="" onSubmit={handleSubmit}>
              <FormControl mb={10} isInvalid={showError}>
                <Input
                  type="email"
                  id="email"
                  name="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Your Email"
                  mb={8}
                  style={{
                    width: '80%',
                    border: 'none',
                    borderBottom: '1px solid rgb(4, 4, 62)',
                    outline: 'none',

                  }}
                />

                <Input
                  type="password"
                  id="password"
                  name="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Password"
                  mb={4}
                  style={{
                    width: '80%',
                    border: 'none',
                    borderBottom: '1px solid rgb(4, 4, 62)',
                    outline: 'none',
                  }}
                />

                {showError && (
                  <FormErrorMessage>
                    {errorMessage}
                  </FormErrorMessage>
                )}
              </FormControl>

              {/* //button divs */}
              <div className="flex flex-nowrap">
                <div className="pt-8 flex flex-nowrap items-center gap-4 flex-col">
                  <div className="flex flex-col sm:flex-row items-center gap-2">
                    <button style={{
                      background: 'transparent',
                      padding: '8px',
                      width: '120px',
                      fontSize: '11px',
                      border: '2px solid #fff',
                      borderRadius: '20px',
                      color: '#fff',
                      textAlign: 'center',
                    }} onClick={goback}>
                      Cancel
                    </button>
                    <button className="defaultButton ml-2" style={{
                      fontSize: '11px',
                      width: '155px',
                      height: '35px',
                    }}>
                      Sign In
                    </button>
                  </div>
                  <Link to="/Signup" className="text-blue-500">Don't have an account yet? Sign up!</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
