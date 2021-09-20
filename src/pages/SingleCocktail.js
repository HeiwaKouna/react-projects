import React from 'react';
import Loading from '../components/Loading';
import { useParams, Link } from 'react-router-dom';
const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

const SingleCocktail = () => {
  const { id } = useParams(17222);
  const [loading, setLoading] = React.useState(false);
  const [cocktail, setCocktail] = React.useState(null);

  React.useEffect(() => {
    setLoading(true);
    const getCocktail = async () => {
      try {
        const response = await fetch(`${url}${id}`);
        const data = await response.json();

        // # if 'drinks' exist
        if (data.drinks) {
          const {
            strDrink: name,
            strDrinkThumb: image,
            strAlcoholic: info,
            strCategory: category,
            strGlass: glass,
            strInstructions: instructions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          } = data.drinks[0];

          const ingredients = [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          ];

          const newCocktail = {
            name: name, // the same as below
            image,
            info,
            category,
            glass,
            instructions,
            ingredients,
          };

          setCocktail(newCocktail);
          setLoading(false);
        } else {
          setCocktail(null);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    getCocktail();
  }, [id]);

  // # if loading is true
  if (loading) {
    return <Loading />;
  }

  // # if no cocktail
  if (!cocktail) {
    return <h2 className="section-title">no cocktail to display</h2>;
  }

  // # else
  const { name, image, category, info, glass, instructions, ingredients } =
    cocktail;

  return (
    <section className="section cocktail-section">
      <Link to="/" className="btn btn-primary">
        back home
      </Link>
      <h2 className="section-title">{name}</h2>
      <div className="drink">
        <img src={image} alt={name} />
        <div className="drink-info">
          <p>
            <span className="drink-data">name :</span>
            {name}
          </p>
          <p>
            <span className="drink-data">category :</span>
            {category}
          </p>
          <p>
            <span className="drink-data">info :</span>
            {info}
          </p>
          <p>
            <span className="drink-data">glass :</span>
            {glass}
          </p>
          <p>
            <span className="drink-data">instructions :</span>
            {instructions}
          </p>
          <p>
            <span className="drink-data">ingredients :</span>
            {ingredients.map((ingredient, index) => {
              {
                /* if ingredient exist, display it, if not return null and display nothing */
                return ingredient ? (
                  <span key={index}>{ingredient}</span>
                ) : null;
              }
            })}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SingleCocktail;
