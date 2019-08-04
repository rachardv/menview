from rake_nltk import Rake
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer


def recommend(restaurant_dishes, reviewed_dishes):
    """
    Note: restaurant_dishes is a list of dish models while reviewed_dishes needs to be
    a list of tuples of the following form [Dish, Review]

    returns the list of restaurant dishes sorted in recommended heirarchy where the first item
    is the most recommended item on the menu 
    """

    # populate the reviewed dish keyword list 
    review_keywords = extract_dish_keywords([d[0] for d in reviewed_dishes])

    # populate restraurant the restaurant dish keyword list
    restaurant_keywords = extract_dish_keywords(restaurant_dishes)

    count = CountVectorizer()

    reviewed_count_matrix = count.fit_transform(review_keywords)
    restaurant_count_matrix = count.transform(restaurant_keywords)

    cos_sim_matrix = cosine_similarity(restaurant_count_matrix, reviewed_count_matrix)

    restaurant_dish_scores = []
    for i in range(len(cos_sim_matrix)):
        max_similarity = -1
        most_similar_dish = -1

        for j in range(len(cos_sim_matrix[i])):
            if cos_sim_matrix[i][j] > max_similarity: 
                max_similarity = cos_sim_matrix[i][j]
                most_similar_dish = j
       
        most_similar_rating = ( reviewed_dishes[most_similar_dish][1].rating - 3 )
        dish_score = max_similarity*most_similar_rating
        restaurant_dish_scores.append([i, dish_score])

    sorted_restaurant_dishes = [x for _, x in sorted(zip(restaurant_dish_scores, restaurant_dishes), key=lambda pair: pair[0][1], reverse=True)]
    return sorted_restaurant_dishes


def extract_dish_keywords(dish_list):
    my_rake = Rake()

    dish_keywords = []
    for dish in dish_list:
        description = dish.dish_description
        my_rake.extract_keywords_from_text(description)

        key_words_dict_score = my_rake.get_word_degrees()
        dish_keywords.append(" ".join(list(key_words_dict_score.keys())))

    return dish_keywords





     

