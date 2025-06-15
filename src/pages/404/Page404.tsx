import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { PageContainer } from "@components/index";
import styles from "./page404.module.css";

export const Page404: FC = () => {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate('/');
  };

  return (
    <PageContainer className='flex-col-center'>
      <div className={styles.content}>
        <div className="text text_type_digits-large">404</div>
        <div>
          <div className="text text_type_main-medium">Ошибка</div>
          <div className="text text_type_main-default text_color_inactive">
            Не удалось найти страницу
          </div>
        </div>
        <Button htmlType="button" onClick={handleNavigateHome}>
          Главная страница
        </Button>
      </div>
    </PageContainer>
  );
};