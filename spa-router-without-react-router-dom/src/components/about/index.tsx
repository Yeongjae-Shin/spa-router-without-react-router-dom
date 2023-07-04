import { useRouter } from "@/hooks";

function About() {
  const history = useRouter();

  return (
    <>
      <h1>this is about page</h1>
      <div className="card">
        <button onClick={() => history.push("/")}>go to main</button>
      </div>
    </>
  );
}

export default About;
