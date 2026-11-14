--
-- PostgreSQL database dump
--

\restrict HcFCcoplN6f6dY33Wb8jdtTPCbovfVshBUbFJziMC6SPxyNXACOklq7UIo90BiL

-- Dumped from database version 18.6
-- Dumped by pg_dump version 18.6

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: hotels; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.hotels (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text NOT NULL,
    latitude numeric(10,7) NOT NULL,
    longitude numeric(10,7) NOT NULL,
    price numeric(10,2) NOT NULL,
    image character varying(255),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: hotels_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.hotels_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: hotels_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.hotels_id_seq OWNED BY public.hotels.id;


--
-- Name: hotels id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hotels ALTER COLUMN id SET DEFAULT nextval('public.hotels_id_seq'::regclass);


--
-- Data for Name: hotels; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.hotels VALUES (2, 'Grand Palace', 'A luxury hotel with modern facilities.', 13.0827000, 80.2707000, 3500.00, '/uploads/1794592098342-images.jpg', '2026-11-13 23:02:39.901471');
INSERT INTO public.hotels VALUES (3, 'Sunrise Residency', 'A comfortable hotel for family stays.', 11.0168000, 76.9558000, 2200.00, '/uploads/1794592159764-images (3).jpg', '2026-11-13 23:02:39.901471');
INSERT INTO public.hotels VALUES (4, 'Ocean View Resort', 'A beautiful resort near the beach.', 12.9141000, 74.8560000, 4500.00, '/uploads/1794592168715-images (2).jpg', '2026-11-13 23:02:39.901471');
INSERT INTO public.hotels VALUES (5, 'Green Valley Hotel', 'A peaceful hotel surrounded by greenery.', 9.9252000, 78.1198000, 1800.00, '/uploads/1794592256284-images (4).jpg', '2026-11-13 23:02:39.901471');
INSERT INTO public.hotels VALUES (6, 'City Comfort Inn', 'An affordable hotel in the city centre.', 13.0674000, 80.2376000, 1200.00, '/uploads/1794592281900-images (5).jpg', '2026-11-13 23:02:39.901471');


--
-- Name: hotels_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.hotels_id_seq', 7, true);


--
-- Name: hotels hotels_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hotels
    ADD CONSTRAINT hotels_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

\unrestrict HcFCcoplN6f6dY33Wb8jdtTPCbovfVshBUbFJziMC6SPxyNXACOklq7UIo90BiL

