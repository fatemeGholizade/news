import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import styles from "app/components/searchInput/searchInput.module.scss";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGetAllNewsQuery } from "app/core/allNewsSlice";

const SearchInput: React.FC = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const formik = useFormik({
    initialValues: { searchQuery: "" },
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
    <div className={styles.searchWrapper}>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="searchQuery"
          className={styles.searchInput}
          value={formik.values.searchQuery}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Search..."
        />
        {formik.errors.searchQuery && formik.touched.searchQuery && (
          <div className={styles.error}>{formik.errors.searchQuery}</div>
        )}
      </form>

      {data !== undefined && data?.articles?.length > 0 && (
        <ul className={styles.suggestionsDropdown}>
          {data.articles.map((item, index) => (
            <>
              <li className={styles.suggestionItem} key={index}>
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
