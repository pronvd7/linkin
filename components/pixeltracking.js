import { useForm } from "react-hook-form";

import styles from "../styles/form.module.css";

const PixelTracking = ({ data, update, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: data });

  return (
    <>
      <div className={styles.Wrapper}>
        <div
          className={`${styles.Inner} col-10 col-sm-10 col-md-10 col-lg-10 col-xl-8 col-xxl-8 `}
        >
          <form onSubmit={(e) => e.preventDefault()}>
            <h3>Pixel Tracking</h3>
          
            <div className="mb-3">
              <label className="form-label">Facebook Pixel</label>
              <textarea
                className="form-control"
                rows="3"
                {...register("facebookPixel")}
              ></textarea>
            </div>{" "}
            <div className="mb-3">
              <label className="form-label">Google Analytic</label>
              <textarea
                className="form-control"
                rows="3"
                {...register("googleAnalytic")}
              ></textarea>
            </div>{" "}
            <button
              type="submit"
              className="btn btn-primary btn-block"
              onClick={handleSubmit(update)}
              disabled={loading}
            >
              {loading && (
                <span
                  className="spinner-border spinner-border-sm me-1"
                  role="status"
                  aria-hidden="true"
                ></span>
              )}
              Save
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default PixelTracking;
