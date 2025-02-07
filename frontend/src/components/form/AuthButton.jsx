const AuthButton = ({ text, isdisabled }) => {
  return (
    <div className="w-full">
      <button
        className={`rounded-lg w-full h-10 text-lg bg-[#3D405B] hover:bg-[#4f536c] text-[#EDF7F4]`}
        type="submit"
        disabled={isdisabled}
      >
        <p> {text}</p>
      </button>
    </div>
  );
};

export default AuthButton;
