import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const FormDesign = () => {
  const schema = z.object({
    name: z.string().min(1, { error: "Enter your name" }),
    description: z.string().min(1, { error: "Enter description" }),
    status: z.boolean().transform((val) => (val ? "A" : "I")),
    image: z
      .any()
      .refine((files) => files?.[0] && files[0].type.startsWith("image/"), {
        message: "Only image files are allowed",
      }),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <div className="title mb-5">
        <h4>Testimonials Form</h4>
      </div>

      <form className="container" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group mb-4">
          <input
            type="text"
            {...register("name")}
            className="form-control"
            placeholder="Name"
          />
          {errors.name && <small className="text-danger">{errors.name.message}</small>}
        </div>

        <div className="form-group mb-4">
          <textarea
            className="form-control"
            {...register("description")}
            rows="3"
            placeholder="Description"
          ></textarea>
          {errors.description && <small className="text-danger">{errors.description.message}</small>}
        </div>

        <div className="form-group mb-4">
          <label>Images Update</label><br />
          <input
            type="file"
            className="form-control-file"
            {...register("image")}
          />
          <br/>
          {errors.image && <small className="text-danger">{errors.image.message}</small>}
        </div>

        <div className="form-check mb-4">
          <input
            className="form-check-input"
            type="checkbox"
            {...register("status")}
          />
          <label>Status - Inactive</label>
        </div>

        <button type="submit" className="btn btn-primary w-100">Send</button>
      </form>
    </div>
  );
};

export default FormDesign;
