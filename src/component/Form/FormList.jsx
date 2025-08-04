import { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { ClipLoader } from "react-spinners";


const TestimonialList = () => {

  const [open, setOpen] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("")
  const [limit] = useState(12);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);



  useEffect(() => {
    setLoading(true);
    axios
      .post(`https://car-parking.emaadinfotech.in/api/testimonial-data?page=${page}`, {
        sort_order: "DESC",
        search_filed: search,
        limit_per_page: limit,
      })
      .then((res) => {
        console.log(res);
        setLoading(false);
        if (res.data.status == "success") {
          setTestimonials(res.data.data.data || []);
          setTotal(res.data.data.total || 0);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [search, page, limit]);

  // Total pages calculation
  const totalPages = Math.ceil(total / limit);

  return (
    <div>

      <div className="container my-5">
        <h2 className="text-center mb-4">Testimonials list</h2>


        {/* Search input */}
        <div className="mb-3">
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="search"
            className="form-control"
            placeholder="Search..."
            aria-label="Search"
          />
        </div>




        {/* Loader Show*/}
        <div className="position-absolute top-50 start-50 translate-middle">
          {loading && <ClipLoader size={150} />}
        </div>



        {/* Data No Found */}

        {testimonials?.length == 0 && <h4 className="text-center fs-1 text-danger">Data Not Found!</h4>}

        <div className="row g-4">

          {testimonials.map((item) => (

            <div key={item.id} className="col-md-4">

              <div className="card border-0 h-100 shadow-sm">
                <img
                  src={item.image_full_url}
                  className="card-img-top"
                  alt={item.name}
                  style={{
                    height: "250px",
                    objectFit: "cover",
                  }}
                />

                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text" style={{
                    fontSize: "18px",
                    maxWidth: "100%",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  }}
                  >{item.description}</p>
                </div>
                <div className="card-footer text-muted border-top-0">
                  {item.created_at}
                </div>

                <div className="card-footer bg-white border-top-0">

                  {/* Button  */}
                  <button
                    className="btn btn-success w-100"
                    onClick={() => setOpen(true)}
                  >
                    View
                  </button>
                </div>


              </div>


            </div>
          ))}
        </div>
      </div>

          {totalPages > 1 && (
          <nav aria-label="Page navigation" className="mt-4">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                >
                  Previous
                </button>
              </li>

              {[...Array(totalPages)].map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${page === index + 1 ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}

              <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        )}

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "black",
        }}
      >
        <div style={{ width: "60%", margin: "auto" }}>
          <div className="card h-100 shadow-sm">
            <img
              src="https://img.freepik.com/free-vector/isometric-feedback-landing-page-template_23-2148955897.jpg?semt=ais_hybrid&w=740"
              className="card-img-top"
              alt="Test seo title"
              style={{
                height: "300px",
                objectFit: "cover",
              }}
            />
            <div className="card-body">
              <h5 className="card-title">Test seo title</h5>
              <p className="card-text">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Sapiente qui neque rerum laboriosam iure provident! In accusamus
                aspernatur quae sit officiis omnis beatae! Natus dolores a nobis
                aliquid ratione? Cum.
              </p>
            </div>
            <div className="card-footer text-muted border-top-0">
              August 14, 2023 09:37 AM
            </div>
            <div className="card-footer bg-white border-top-0">
              <button
                className="btn btn-primary w-100"
                onClick={() => setOpen(true)}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );

};
export default TestimonialList;






