import { useRouter } from "@/hooks";

const Main = () => {
  const history = useRouter();

  return (
    <>
      <h1>this is main page</h1>
      <div className="card">
        <button onClick={() => history.push("/about")}>go to about</button>
      </div>
    </>
  );
};

export default Main;
