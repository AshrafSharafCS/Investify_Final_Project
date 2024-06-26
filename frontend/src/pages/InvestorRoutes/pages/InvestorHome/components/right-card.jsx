import { useNavigate } from "react-router-dom";

function RightCard({ business }) {
  const navigate = useNavigate();

  const { id, name, industry, description } = business;
  const handleViewMore = () => {
    navigate(`/investor/single-business/${id}`);
  };
  return (
    <div className="investor-business-card-right flex gap-20 -right ">
      <div className="investor-business-description-right padding-10 flex column gap-20">

          <h1>{name}</h1>
          <h4>{industry}</h4>
          <p>{description}</p>
   

        <div className="investor-business-button-right flex center">
        <button
          onClick={() => {
            handleViewMore();
          }}
        >
          View more
        </button>
        </div>
      </div>
      <div className="investor-business-img-right">
        <img src={"http://127.0.0.1:8000/business_images/" + business.image} alt="No image" />
      </div>
    </div>
  );
}
export default RightCard;
