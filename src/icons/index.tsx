import {
  BookmarkCheck as BookmarkCheckIcon,
  Bookmark as BookmarkIcon,
  Check as CheckIcon,
  CardChecklist as ChecklistIcon,
  PencilSquare as PencilSquareIcon,
  Plus as PlusIcon,
  Search as SearchIcon,
  Trash as TrashIcon,
  X as XIcon,
} from 'react-bootstrap-icons';

import type { HTMLElementClassName } from '~/../types/types';

interface Theme {
  /**
   * Fill color.
   */
  fill: string;

  /**
   * HTML class string for normal icon size.
   */
  md: HTMLElementClassName;

  /**
   * HTML class string for small icon size.
   */
  sm: HTMLElementClassName;
}

const theme: Theme = {
  fill: 'currentColor',
  md: 'text-gray-700',
  sm: 'text-gray-700 w-3 h-3',
};

export const Journal = () => {
  return (
    <svg version='1.1' viewBox='0 0 256 64' xmlns='http://www.w3.org/2000/svg' fill={theme.fill} className={theme.md + ' h-7'}>
      <path d='m31.199 29.158v-16.758h2.0349v14.644l3.5468-2.5065a1.0174 1.197 0 0 1 1.0459 0l3.5468 2.5065v-14.644h2.0349v16.758a1.0174 1.197 0 0 1-1.5404 1.027l-4.5643-3.2223-4.5643 3.2247a1.0174 1.197 0 0 1-1.5404-1.0294z' />
      <path d='m21.539 9.6h23.8a4.76 5.6 0 0 1 4.76 5.6v33.6a4.76 5.6 0 0 1-4.76 5.6h-23.8a4.76 5.6 0 0 1-4.76-5.6v-2.8h2.38v2.8a2.38 2.8 0 0 0 2.38 2.8h23.8a2.38 2.8 0 0 0 2.38-2.8v-33.6a2.38 2.8 0 0 0-2.38-2.8h-23.8a2.38 2.8 0 0 0-2.38 2.8v2.8h-2.38v-2.8a4.76 5.6 0 0 1 4.76-5.6z' />
      <path d='m16.779 23.6v-1.4a1.19 1.4 0 0 1 2.38 0v1.4h1.19a1.19 1.4 0 0 1 0 2.8h-4.76a1.19 1.4 0 0 1 0-2.8zm0 8.4v-1.4a1.19 1.4 0 0 1 2.38 0v1.4h1.19a1.19 1.4 0 0 1 0 2.8h-4.76a1.19 1.4 0 0 1 0-2.8zm0 8.4v-1.4a1.19 1.4 0 0 1 2.38 0v1.4h1.19a1.19 1.4 0 0 1 0 2.8h-4.76a1.19 1.4 0 0 1 0-2.8z' />
      <path d='m109.02 18.338q0.60547 0 1.0742 0.42969 0.48828 0.42969 0.48828 0.95703 0 4.7852-1.1328 12.754-1.1133 7.9492-3.5938 11.777t-6.6992 3.8281q-3.2227 0-6.7188-2.3633-3.4766-2.3633-3.4766-4.0039 0-1.7188 1.9336-1.7188 0.60547 0 1.6992 1.0742 3.5938 3.6133 6.6211 3.6133 2.6367 0 4.2578-2.8125 1.6406-2.832 2.6367-9.4531 0.99609-6.6406 0.99609-12.461 0-0.60547 0.64453-1.1133 0.64453-0.50781 1.2695-0.50781z' />
      <path d='m120.9 48.806q-2.6758 0-4.4141-2.0312t-1.7383-5.0195q0-5.0391 3.3789-9.9219 3.3984-4.9023 8.125-4.9023 3.125 0 5.0586 2.4023 1.9531 2.4023 1.9531 5.7227 0 5.0781-4.0234 9.4141-4.0039 4.3359-8.3398 4.3359zm-2.7148-7.5586q0 1.9727 0.82031 3.2227 0.83985 1.25 2.207 1.25 2.9102 0 5.8398-3.1836 2.9297-3.2031 2.9297-7.1094 0-2.4023-1.1328-3.8867-1.1133-1.5039-3.0078-1.5039-3.1445 0-5.4102 3.8672-2.2461 3.8477-2.2461 7.3438z' />
      <path d='m151.6 39.334q-2.5 4.1992-5.1172 6.5039t-4.8633 2.3047q-1.2891 0-2.6367-1.5039-1.3281-1.5039-1.3281-4.6289 0-2.5586 1.2305-7.5391 1.0352-4.1602 1.0352-5.8398 0.56641-1.1719 1.7774-1.1719 0.82031 0 1.3086 0.58594 0.48828 0.56641 0.48828 1.1914 0 1.3672-0.95703 3.8867-1.8164 4.9023-1.8164 8.418 0 3.2031 1.4844 3.2031 1.8945 0 4.8242-3.2227t5.0195-8.9844q0.82031-2.3047 1.3281-2.9883 0.52735-0.70312 1.4062-0.70312 1.3281 0 1.3281 1.7578 0 0.21484-0.3711 1.4258-1.1719 4.2773-1.1719 8.0859 0 4.5703 1.5039 5.918 0.78125 0.72266 0.78125 1.1719 0 0.54688-0.80079 0.99609-0.78125 0.44922-1.4258 0.44922-1.3672 0-2.207-2.0312-0.83984-2.0312-0.83984-5.9961v-0.64453q0-0.3125 0.0195-0.64453z' />
      <path d='m166.15 40.076q0.19531-0.35156 0.46875-0.97656 1.3281-3.0469 2.4414-4.7656 1.1133-1.7383 2.4414-3.3203 1.3477-1.582 2.4414-2.4023 1.1133-0.82031 2.0117-1.1328 0.89844-0.33203 1.7383-0.33203 1.6992 0 2.7734 1.0352 1.0742 1.0156 1.0742 2.3828 0 0.60547-0.39063 1.0938-0.37109 0.48828-1.1523 0.48828-0.82032 0-1.5039-0.72266-0.70312-0.72266-1.4648-0.72266-2.0312 0-5.625 4.9219t-4.375 10.84q-0.19532 1.5234-0.74219 2.0117-0.54688 0.48828-1.543 0.48828-0.95703 0-1.3867-1.4258-0.42969-1.4258-0.42969-4.8047 0-0.91797 0.0977-4.043 0.11719-3.6914 0.46875-5.957 0.0586-0.37109 0.19531-1.7383 0.13672-1.5039 0.33203-2.0898 0.21485-0.58594 0.83985-1.0938 0.64453-0.50781 1.3867-0.50781 0.72265 0 1.0742 0.46875 0.37109 0.44922 0.37109 0.97656 0 0.76172-0.39063 2.1484-0.44921 1.543-0.52734 2.1289-0.0586 0.66406-0.21484 1.3867-0.19532 0.83984-0.39063 4.4141l-0.0195 0.72266z' />
      <path d='m196.66 32.81q-1.0156 0-2.2266 1.3281-1.1914 1.3281-3.6523 5.957-3.2422 6.2109-4.1992 7.0703-0.9375 0.85938-1.5625 0.85938-2.3047 0-2.3047-2.2266 0-0.9375 0.3125-2.6562 1.0742-5.8984 1.0742-12.441 0-0.74219 0.625-1.6406 0.64453-0.91797 1.2109-0.91797 1.0156 0 1.4453 0.625t0.42969 2.5195q0 1.9727-1.1719 8.125-0.39062 2.0312-0.39062 2.5781 0 0.3125 0.15625 0.3125 0.29297 0 2.7148-4.668 2.4414-4.7461 4.2773-6.6797t4.043-1.9336q1.7578 0 2.8516 1.6016 1.1133 1.6016 1.6211 5.8398 0.54687 4.8242 0.97656 6.0156 0.44922 1.1719 1.4062 1.1719 0.60547 0 1.5234-0.42969 0.15625-0.07813 0.23437-0.07813 0.83985 0 0.83985 0.97656 0 0.85938-1.1524 1.8359-1.1523 0.95703-2.7734 0.95703-1.6602 0-2.5781-1.3086-0.89844-1.3281-1.4258-7.0508-0.54687-5.7422-2.3047-5.7422z' />
      <path d='m223.05 40.721q-2.7344 3.6719-5.4102 5.5078t-4.9024 1.8359q-1.5039 0-2.5976-1.2695t-1.0938-3.2617q0-5.1367 4.5898-11.055 4.5898-5.9375 9.1211-5.9375 1.6406 0 2.4414 1.875 0.25391 0.625 0.80078 0.625 1.5625 0 1.5625 1.2109 0 0.60547-0.19531 1.6602-1.0547 5.7617-1.0547 8.125 0 4.7266 1.7969 5.6641 0.85937 0.46875 0.85937 1.1523 0 0.60547-0.83984 1.2109-0.83985 0.625-1.6211 0.625-1.5039 0-2.4805-2.0703-0.97656-2.0703-0.97656-5.8984zm-1.1914-10.996q-2.5781 0-5.9961 4.8438-3.418 4.8242-3.418 8.0078 0 2.2461 1.4844 2.2461 2.1484 0 5.957-4.3359t3.8086-7.9688q0-2.793-1.8359-2.793z' />
      <path d='m240.19 14.763q1.4062 0 1.4062 1.7969 0 1.6016-1.6992 7.6172-1.0742 3.7891-1.6602 8.3594-0.58593 4.5703-0.58593 7.168 0 3.2227 0.41015 6.4062 0.0781 0.60547 0.0781 0.87891 0 0.97656-0.66406 1.6797-0.66407 0.70312-1.4062 0.70312-1.0352 0-1.4453-1.2891-0.39062-1.2891-0.39062-4.1602 0-6.543 1.5625-16.211 1.582-9.668 2.5-11.309 0.9375-1.6406 1.8945-1.6406z' />
    </svg>
  );
};

export const Bin = () => {
  return <TrashIcon className={theme.sm} fill={theme.fill} />;
};

export const Check = () => {
  return <CheckIcon className={theme.md} fill={theme.fill} />;
};

export const Checklist = (props: { className: HTMLElementClassName }) => {
  return <ChecklistIcon className={props.className || theme.md} fill={theme.fill} />;
};

export const Edit = () => {
  return <PencilSquareIcon className={theme.sm} fill={theme.fill} />;
};

export const Plus = () => {
  return <PlusIcon className={theme.md} fill={theme.fill} />;
};

export const Search = () => {
  return <SearchIcon className={theme.sm} fill={theme.fill} />;
};

export const X = () => {
  return <XIcon className={theme.md} fill={theme.fill} />;
};

export const Bookmark = () => {
  return <BookmarkIcon className={theme.md} fill={theme.fill} />;
};

export const BookmarkFill = () => {
  return <BookmarkCheckIcon className={theme.md} fill={theme.fill} />;
};
