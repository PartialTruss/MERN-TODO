import { useTranslation } from "react-i18next";

const Title = ({ title_info }) => {
  const { t } = useTranslation();

  return (
    <div className="text-center py-8 text-2xl font-bold text-[#3D405B]">
      <h1>{t(title_info)}</h1>
    </div>
  );
};

export default Title;
