import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import styles from './searchInput.module.scss';
import { useGetAllNewsQuery } from '@/app/core/allNewsSlice';
import Link from 'next/link';
import { IArticle } from '@/app/types/news';
import { useRouter } from 'next/navigation'

interface Article {
  title: string;
}

const SearchInput: React.FC = () => {
  const [query, setQuery] = useState('');
  const [filteredTitles, setFilteredTitles] = useState<IArticle[]>([]);
  const router = useRouter()

  const { data } = useGetAllNewsQuery();

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
        if(filteredTitles?.length > 0){
            router.push(`/${filteredTitles[0]?.title}`)

        }
    },
  });

  useEffect(() => {
    setQuery(formik.values.searchQuery);
  }, [formik.values.searchQuery]);
  useEffect(() => {
    if (data && query.length > 0) {
      const filtered = data.articles
        .filter((article: Article) =>
          article.title.toLowerCase().includes(query.toLowerCase())
        );
      setFilteredTitles(filtered);  
    } else {
      setFilteredTitles([]);  
    }
  }, [query, data]);
  
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

      {query && filteredTitles.length > 0 && (
        <ul className={styles.suggestionsDropdown}>
          {filteredTitles.map((item, index) => (
            <Link href={`${item?.source?.id}`}>
            <li
              key={index}
              className={styles.suggestionItem}
            >
              {item?.title}
            </li>
            </Link>

          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;
