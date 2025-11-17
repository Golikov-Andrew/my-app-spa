import { Form, Button, Alert } from "react-bootstrap";
import {
  setLoginFormData,
  setRedirectToAccount,
  setRedirectToLogin,
} from "../../../../app/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import type { RootState } from "../../../../app/store";
import { loginUser } from "../../../../app/authThunks";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const loginFormData = useAppSelector(
    (state: RootState) => state.auth.loginFormData
  );
  const error = useAppSelector((state: RootState) => state.auth.error);
  dispatch(setRedirectToLogin(false));

  const isRedirectToAccount = useAppSelector(
    (state: RootState) => state.auth.isRedirectToAccount
  );

  const handleChangeForm = (e: any) => {
    dispatch(
      setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value })
    );
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    dispatch(loginUser(loginFormData)).then((val) => {
      if (val.payload === true) {
        dispatch(setRedirectToAccount(true));
        console.log(val.payload);
      }
    });
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (isRedirectToAccount) {
      navigate("/account", { replace: true });
    }
  }, [navigate, isRedirectToAccount]);

  return (
    <div className="container mt-3">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="mb-4">Вход</h2>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={loginFormData.username}
                onChange={handleChangeForm}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={loginFormData.password}
                onChange={handleChangeForm}
                required
              />
            </Form.Group>
            <Button variant="danger" type="submit">
              Войти
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
