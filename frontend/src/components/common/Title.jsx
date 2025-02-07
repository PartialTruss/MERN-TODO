import { useTranslation } from "react-i18next";

const Title = ({ section_title }) => {
  const { t } = useTranslation();
  return (
    <h2 className="text-[#F4F1DE] text-xl sm:text-2xl mt-3">
      {t(section_title)}
    </h2>
  );
};

export default Title;
