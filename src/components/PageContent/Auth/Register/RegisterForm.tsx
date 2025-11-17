import { Form, Button, Alert } from "react-bootstrap";
import {
  registerFailure,
  setRedirectToLogin,
  setRegisterFormData,
} from "../../../../app/slices/authSlice";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import type { RootState } from "../../../../app/store";
import { registerUser } from "../../../../app/authThunks";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const formData = useAppSelector(
    (state: RootState) => state.auth.registerFormData
  );
  const error = useAppSelector((state: RootState) => state.auth.error);
  const isRedirectToLogin = useAppSelector(
    (state: RootState) => state.auth.isRedirectToLogin
  );

  const handleChangeForm = (e: any) => {
    dispatch(
      setRegisterFormData({ ...formData, [e.target.name]: e.target.value })
    );
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      dispatch(registerFailure("Пароли не совпадают"));
      return;
    }
    dispatch(registerUser(formData)).then((val) => {
      if (val.payload === true) {
        dispatch(setRedirectToLogin(true));
      }
    });
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (isRedirectToLogin) {
      navigate("/login", { replace: true });
    }
  }, [navigate, isRedirectToLogin]);

  return (
    <div className="container mt-3">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="mb-4">Регистрация</h2>

          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Имя пользователя</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChangeForm}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChangeForm}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChangeForm}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label>Подтвердите пароль</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChangeForm}
                required
              />
            </Form.Group>

            <Button variant="danger" type="submit">
              Зарегистрироваться
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
