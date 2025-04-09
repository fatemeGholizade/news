import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import styles from "app/components/searchInput/searchInput.module.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGetAllNewsQuery } from "app/core/allNewsSlice";
import { useDispatch } from "react-redux";
import { setSelectedArticle } from 'app/core/articleSlice';

const SearchInput: React.FC = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: { searchQuery: "" },
    validateOnChange: true,
    validate: (values) => {
      const errors: { searchQuery?: string } = {};
      if (!/^[a-zA-Z\s]*$/.test(values.searchQuery)) {
        errors.searchQuery = "Only English letters are allowed";
      }
      if (values.searchQuery.length > 100) {
        errors.searchQuery = "Max length is 100 characters";
      }
      return errors;
    },
    onSubmit: () => {
      if (data?.articles && data.articles.length > 0) {
        router.push(`/${data.articles[0].title}`);
        dispatch(setSelectedArticle(data?.articles[0]))

      }
    },
  });

  const shouldSkip = query.length < 2 || !!formik.errors.searchQuery;

  const { data } = useGetAllNewsQuery({ title: query }, { skip: shouldSkip });

  // add timer to send request after some times
  useEffect(() => {
    const handler = setTimeout(() => {
      setQuery(formik.values.searchQuery);
    }, 200);

    return () => clearTimeout(handler);
  }, [formik.values.searchQuery]);

  return (
    <div className={styles.search_wrapper}>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="searchQuery"
          className={styles.search_input}
          value={formik.values.searchQuery}
          onChange={(e) => {
            formik.setFieldTouched("searchQuery", true);
            formik.handleChange(e);
          }}
          onBlur={formik.handleBlur}
          placeholder="Search..."
        />
        {formik.errors.searchQuery && formik.touched.searchQuery && (
          <div className={styles.error}>{formik.errors.searchQuery}</div>
        )}
      </form>

      {data !== undefined && data?.articles?.length > 0 && (
        <ul className={styles.suggestions_dropdown }>
          {data.articles.map((item, index) => (
            <>
              <li className={styles.suggestion_item} key={index}                   onClick={() => dispatch(setSelectedArticle(item))}
              >
                <Link className={styles.link} href={`/${item.title}`}>
                  {item.title}
                </Link>
              </li>
              <hr />
            </>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;
