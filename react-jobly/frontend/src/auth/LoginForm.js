import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  Form,
  Label,
  Input,
  FormGroup,
  Alert,
} from "reactstrap";

/** Login form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls login function prop
 * - redirects to "/" route
 *
 * Routes -> SignupForm
 * Routed as /login
 */

const LoginForm = ({ login }) => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState([]);

  console.debug(
    "LoginForm",
    "login=",
    typeof login,
    "formData=",
    formData,
    "formErrors=",
    formErrors
  );

  //update state of formData onChange of any form input field
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((fData) => ({
      ...fData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let result = await login(formData);
    if (result.success) {
      history.push("/");
    } else {
      setFormErrors(result.errors);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-sm-8">
        <Card className="px-5 py-3">
          <CardBody>
            <CardTitle className="display-4 text-center">Login</CardTitle>

            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input
                  className="form-control"
                  id="username"
                  name="username"
                  type="text"
                  onChange={handleChange}
                  required
                  autoComplete="username"
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input
                  className="form-control"
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                ></Input>
              </FormGroup>

              {formErrors.length
                ? formErrors.map((err) => (
                    <Alert color="danger" key={err}>
                      {err}
                    </Alert>
                  ))
                : null}

              <div className="row justify-content-end">
                <div className="col-auto">
                  <button className="btn btn-primary btn-block px-4">
                    login
                  </button>
                </div>
              </div>
            </Form>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;
