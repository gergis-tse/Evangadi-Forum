
import "tailwindcss/tailwind.css";
function About() {
  return (
    <section>
          <div className="col-12 col-md-6 explained px-4 md:px-0">
            <p className="text-orange-500 mb-2">About</p>
            <h1 className="mb-6">
              <span
                className="text-4xl font-bold"
                style={{
                  background: `linear-gradient(to right, rgb(230, 186, 150), rgb(211, 59, 0), rgb(151, 41, 0), rgb(61, 17, 0), rgb(15, 4, 0))`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Evangadi Networks
              </span>
            </h1>

            <p className="text-gray-700 mb-4">
              No matter what stage of life you are in, whether you’re just
              starting elementary school or being promoted to CEO of a Fortune
              500 company, you have much to offer to those who are trying to
              follow in your footsteps.
            </p>

            <p className="text-gray-700 mb-4">
              Whether you are willing to share your knowledge or you are just
              looking to meet mentors of your own, please start by joining the
              network here.
            </p>

            <button className="bg-orange-500 text-white rounded-md py-2 px-6">
              HOW IT WORKS
            </button>
          </div>
      
    </section>
  );
}

export default About;
