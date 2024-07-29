import React from "react";
import "./DetailedView.scss";
import { appLevelConstants } from "../../AppLevelConstants";

const DetailedView = () => {
  const movieData = {
    adult: false,
    backdrop_path: "/5g2n3ilC8DpYv4diJeuQ1vKG2Kb.jpg",
    belongs_to_collection: {
      id: 86066,
      name: "Despicable Me Collection",
      poster_path: "/95prV91f4DxkBnLU43YjLbU1m3q.jpg",
      backdrop_path: "/37xamYKRUGCRux532lKcZdVGYuR.jpg",
    },
    budget: 100000000,
    genres: [
      {
        id: 16,
        name: "Animation",
      },
      {
        id: 10751,
        name: "Family",
      },
      {
        id: 35,
        name: "Comedy",
      },
      {
        id: 28,
        name: "Action",
      },
    ],
    homepage: "https://www.despicable.me",
    id: 519182,
    imdb_id: "tt7510222",
    origin_country: ["US"],
    original_language: "en",
    original_title: "Despicable Me 4",
    overview:
      "Gru and Lucy and their girls — Margo, Edith and Agnes — welcome a new member to the Gru family, Gru Jr., who is intent on tormenting his dad. Meanwhile, Gru faces a new nemesis in Maxime Le Mal and his femme fatale girlfriend Valentina, forcing the family to go on the run.",
    popularity: 4244.624,
    poster_path: "/wWba3TaojhK7NdycRhoQpsG0FaH.jpg",
    production_companies: [
      {
        id: 6704,
        logo_path: "/fOG2oY4m1YuYTQh4bMqqZkmgOAI.png",
        name: "Illumination",
        origin_country: "US",
      },
      {
        id: 33,
        logo_path: "/8lvHyhjr8oUKOOy2dKXoALWKdp0.png",
        name: "Universal Pictures",
        origin_country: "US",
      },
    ],
    production_countries: [
      {
        iso_3166_1: "US",
        name: "United States of America",
      },
    ],
    release_date: "2024-06-20",
    revenue: 596680150,
    runtime: 94,
    spoken_languages: [
      {
        english_name: "English",
        iso_639_1: "en",
        name: "English",
      },
    ],
    status: "Released",
    tagline: "Things just got a little more despicable.",
    title: "Despicable Me 4",
    video: false,
    vote_average: 7.2,
    vote_count: 443,
  };
  return (
    <>
      <div className="detail-screen-wrapper">
        <div className="detail-screen-header">
          <h2 className="details-screen-h2">Details Screen</h2>
        </div>
        <div className="detail-screen-body">
          <img src={appLevelConstants.TMDB_IMG_URL + movieData.backdrop_path} alt={movieData.title} className="detail-screen-bg"/>
          <div className="detail-screen-info-wrapper">
            <div className="detail-screen-img">
              <img src={appLevelConstants.TMDB_IMG_URL + movieData.poster_path} alt={movieData.title} className="detail-screen-poster"/>
            </div>
            <div className="detail-screen-info">
              <div className="detail-screen-title">
                <span>{movieData.title}</span>
                <span>{movieData.release_date}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailedView;
