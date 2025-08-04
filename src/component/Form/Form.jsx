import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import z from "zod";
import { CircularProgress } from "@mui/material";

const schema = z.object({
  name: z.string().min(1, { message: "Enter your name" }),
  description: z.string().min(1, { message: "Enter description" }),
  status: z.boolean().transform((val) => (val ? "A" : "I")),
  image: z
    .any()
    .refine((file) => file instanceof File, {
      message: "Please upload a valid image file",
    })
    .refine((file) => file && file.type?.startsWith("image/"), {
      message: "Only PNG, JPEG, or GIF files are allowed",
    }),
});

const FormDesign = () => {
  const [selectedImage, setSelectedImage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(schema),
  });

  // const onSubmit = (data) => {
  //   console.log(data);
  // };

  const navigate = useNavigate();

  const [loader, setLoader] = useState(false);

  const formAPI = "https://car-parking.emaadinfotech.in/api/testimonial-save";

  const onSubmit = (data) => {
    console.log(data); // JSON

    const formData = new FormData(); // FormData
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("image", data.image);
    formData.append("status", data.status);

    setLoader(true);

    axios
      .post(formAPI, formData)
      .then((res) => {
        console.log(res.data);

        if (res.data.status == "error") {
          console.log("Inside");
          toast.error(res.data.message.join());
        } else if (res.data.status == "success") {
          // toast.success("Data Saved on Server!");
          navigate("/list");
        }

        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };


  const handleImageFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/png", "image/jpeg", "image/gif"];
    if (!allowedTypes.includes(file.type)) {
      alert("Please select a PNG, JPEG, or GIF image.");
      return;
    }

    setSelectedImage(URL.createObjectURL(file));
    setValue("image", file);
  };

  return (
    <div>
      <div className="title mb-5">
        <h4>Testimonials Form</h4>
      </div>

      <form className="container" onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <div className="form-group mb-4">
          <input
            type="text"
            {...register("name")}
            className="form-control"
            placeholder="Name"
          />
          {errors.name && (
            <small className="text-danger">{errors.name.message}</small>
          )}
        </div>

        {/* Description */}
        <div className="form-group mb-4">
          <textarea
            className="form-control"
            {...register("description")}
            rows="3"
            placeholder="Description"
          ></textarea>
          {errors.description && (
            <small className="text-danger">
              {errors.description.message}
            </small>
          )}
        </div>

        {/* Image */}
        <div className="form-group mb-4">
          <label>Images Update</label>
          <br />
          <input
            type="file"
            className="form-control-file"
            onChange={handleImageFile}
          />
          {errors.image && (
            <small className="text-danger">{errors.image.message}</small>
          )}
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Preview"
              style={{
                height: "200px",
                borderRadius: "6px",
                objectFit: "contain",
                marginTop: "10px",
              }}
            />
          )}
        </div>

        {/* Status */}
        <div className="form-check mb-4">
          <input
            className="form-check-input"
            type="checkbox"
            {...register("status")}
          />
          {errors.status && (
            <small className="text-danger">{errors.status.message}</small>
          )}

          <label className="ms-2">
            Status - {watch("status") ? "Active" : "Inactive"}
          </label>
        </div>

        {/* Sumbit Button  */}

        <button type="submit" className="btn btn-primary w-100">
          Send
        </button>

        {loader && <CircularProgress />}
      </form>
    </div>
  );
};

export default FormDesign;
