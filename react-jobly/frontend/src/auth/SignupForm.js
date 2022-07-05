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

/** Signup form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls signup function prop
 * - redirects to "/" route
 *
 * Routes -> SignupForm
 * Routed as /signup
 */

const SignupForm = ({ signup }) => {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const [formErrors, setFormErrors] = useState([]);

  console.debug(
    "SignupForm",
    "signup=",
    typeof signup,
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
    //signup function passes form data up to <App/>
    let result = await signup(formData);
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
            <CardTitle className="display-4 text-center">Register</CardTitle>

            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="form-control"
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
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                ></Input>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input
                  className="form-control"
                  id="email"
                  name="email"
                  type="text"
                  value={formData.email}
                  onChange={handleChange}
                  required
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
                    Register
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

export default SignupForm;
