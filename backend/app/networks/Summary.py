import nltk
from nltk.corpus import stopwords
from nltk.cluster.util import cosine_distance
import numpy as np
import networkx as nx


class Summary:
    def read_article(self, text):
        # Разбиение текста на предложения
        article = text.split(". ")
        sentences = []

        for sentence in article:
            # Замена не букв на пробелы и разбиение по пробелам( в каждом предложении)
            sentences.append(sentence.replace("[^a-zA-Z]", " ").split(" "))
        sentences.pop()

        return sentences

    def sentence_similarity(self, sent1, sent2, stopwords=None):
        if stopwords is None:
            stopwords = []

        # Делаем все слова строчным шрифтом
        sent1 = [w.lower() for w in sent1]
        sent2 = [w.lower() for w in sent2]

        # Список всех уникальных слов
        all_words = list(set(sent1 + sent2))

        # Вектора длинной в количество слов в предложении
        vector1 = [0] * len(all_words)
        vector2 = [0] * len(all_words)

        # build the vector for the first sentence
        for w in sent1:
            if w in stopwords:
                continue
            # i-ый элемент 1 вектора увеличиваем на 1, где i - индекс слова в множестве всех слов
            vector1[all_words.index(w)] += 1

        # build the vector for the second sentence
        for w in sent2:
            if w in stopwords:
                continue
            vector2[all_words.index(w)] += 1

        # Чем ближе вектора друг к другу, тем более похожи предложения
        return 1 - cosine_distance(vector1, vector2)

    def build_similarity_matrix(self, sentences, stop_words):
        # Create an empty similarity matrix
        # Матрица NxN, где N - количество предложений
        similarity_matrix = np.zeros((len(sentences), len(sentences)))

        for idx1 in range(len(sentences)):
            for idx2 in range(len(sentences)):
                if idx1 == idx2:  # ignore if both are same sentences
                    continue
                # Заполняем матрицу, i,j элемент которой - схожест двух предложений(i-го и j-го)
                similarity_matrix[idx1][idx2] = self.sentence_similarity(
                    sentences[idx1], sentences[idx2], stop_words
                )

        return similarity_matrix

    def generate_summary(self, text, top_n=5):
        nltk.download("stopwords")
        stop_words = stopwords.words("english")
        summarize_text = []

        # Step 1 - Read text anc split it
        sentences = self.read_article(text)

        # Step 2 - Generate Similary Martix across sentences
        sentence_similarity_martix = self.build_similarity_matrix(sentences, stop_words)

        # Step 3 - Rank sentences in similarity martix
        sentence_similarity_graph = nx.from_numpy_array(sentence_similarity_martix)
        # испольуем алгоритм ранжирования для графа матриц
        scores = nx.pagerank(sentence_similarity_graph)

        # Step 4 - Sort the rank and pick top sentences
        ranked_sentence = sorted(
            ((scores[i], s) for i, s in enumerate(sentences)), reverse=True
        )
        print("Indexes of top ranked_sentence order are ", ranked_sentence)

        for i in range(min(top_n, len(ranked_sentence))):
            summarize_text.append(" ".join(ranked_sentence[i][1]))

        # Step 5 - Offcourse, output the summarize text
        # print("Summarize Text: \n", ". ".join(summarize_text))
        return ". ".join(summarize_text)
