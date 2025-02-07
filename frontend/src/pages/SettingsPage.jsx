import Title from "../components/common/Title";
import Settings from "../components/settings/Settings";

const SettingsPage = () => {
  return (
    <div className="h-screen p-5 lg:p-0">
      <Title section_title="Settings" />
      <Settings />
    </div>
  );
};

export default SettingsPage;
