import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import styles from './searchInput.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { useGetAllNewsQuery } from '@/app/core/allNewsSlice';

const SearchInput: React.FC = () => {
  const [query, setQuery] = useState('');
  const router = useRouter()

  const { data } = useGetAllNewsQuery({title:query});

  const formik = useFormik({
    initialValues: { searchQuery: '' },
    validate: (values) => {
      const errors: { searchQuery?: string } = {};
      if (!/^[a-zA-Z\s]*$/.test(values.searchQuery)) {
        errors.searchQuery = 'Only English letters are allowed';
      }
      if (values.searchQuery.length > 100) {
        errors.searchQuery = 'Max length is 100 characters';
      }
      return errors;
    },
    onSubmit: () => {
        if(data?.articles && data?.articles?.length > 0){
            router.push(`/${data?.articles[0]?.title}`)

        }
    },
  });

  useEffect(() => {
    setQuery(formik.values.searchQuery);
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
        {formik.errors.searchQuery !== undefined && formik.touched.searchQuery !== undefined  && 
          <div className={styles.error}>{formik.errors.searchQuery}</div>
        }
      </form>

      {query !== null && data?.articles && data?.articles.length > 0 && (
        <ul className={styles.suggestionsDropdown}>
          {data?.articles.map((item, index) => {
            return (
              <Link href={`${item?.source?.id}`}>
                <li
                  key={index}
                  className={styles.suggestionItem}
                >
                  {item?.title}
                </li>
              </Link>

            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;
