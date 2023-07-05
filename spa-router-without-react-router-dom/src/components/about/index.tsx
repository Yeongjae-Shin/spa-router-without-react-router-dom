import { useRouter } from "@/hooks";

const About = () => {
  const history = useRouter();

  return (
    <>
      <h1>this is about page</h1>
      <div className="card">
        <button onClick={() => history.push("/")}>go to main</button>
      </div>
    </>
  );
};

export default About;
