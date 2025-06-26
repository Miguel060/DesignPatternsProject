--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

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
-- Name: agencia; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.agencia (
    idagencia integer NOT NULL,
    nmagencia character varying(100) NOT NULL,
    vltxagencia double precision NOT NULL
);


ALTER TABLE public.agencia OWNER TO postgres;

--
-- Name: agencia_idagencia_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.agencia_idagencia_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.agencia_idagencia_seq OWNER TO postgres;

--
-- Name: agencia_idagencia_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.agencia_idagencia_seq OWNED BY public.agencia.idagencia;


--
-- Name: grupo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.grupo (
    idgrupo integer NOT NULL
);


ALTER TABLE public.grupo OWNER TO postgres;

--
-- Name: grupo_idgrupo_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.grupo_idgrupo_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.grupo_idgrupo_seq OWNER TO postgres;

--
-- Name: grupo_idgrupo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.grupo_idgrupo_seq OWNED BY public.grupo.idgrupo;


--
-- Name: hotel; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hotel (
    idhotel integer NOT NULL,
    nmhotel character varying(100) NOT NULL,
    vlhotel double precision NOT NULL,
    idpais integer
);


ALTER TABLE public.hotel OWNER TO postgres;

--
-- Name: hotel_idhotel_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.hotel_idhotel_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.hotel_idhotel_seq OWNER TO postgres;

--
-- Name: hotel_idhotel_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.hotel_idhotel_seq OWNED BY public.hotel.idhotel;


--
-- Name: pais; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pais (
    idpais integer NOT NULL,
    nmpais character varying(100) NOT NULL,
    vlpassagem double precision NOT NULL,
    img text
);


ALTER TABLE public.pais OWNER TO postgres;

--
-- Name: pais_idpais_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pais_idpais_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pais_idpais_seq OWNER TO postgres;

--
-- Name: pais_idpais_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pais_idpais_seq OWNED BY public.pais.idpais;


--
-- Name: pessoa; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pessoa (
    idpessoa integer NOT NULL,
    nmpessoa character varying(100) NOT NULL,
    idgrupo integer NOT NULL
);


ALTER TABLE public.pessoa OWNER TO postgres;

--
-- Name: pessoa_idpessoa_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pessoa_idpessoa_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pessoa_idpessoa_seq OWNER TO postgres;

--
-- Name: pessoa_idpessoa_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pessoa_idpessoa_seq OWNED BY public.pessoa.idpessoa;


--
-- Name: viagem; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.viagem (
    idviagem integer NOT NULL,
    vlviagem double precision NOT NULL,
    idpais integer NOT NULL,
    idgrupo integer,
    idhotel integer NOT NULL,
    idagencia integer NOT NULL,
    qntpessoas integer,
    dtviagem text
);


ALTER TABLE public.viagem OWNER TO postgres;

--
-- Name: viagem_idviagem_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.viagem_idviagem_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.viagem_idviagem_seq OWNER TO postgres;

--
-- Name: viagem_idviagem_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.viagem_idviagem_seq OWNED BY public.viagem.idviagem;


--
-- Name: agencia idagencia; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agencia ALTER COLUMN idagencia SET DEFAULT nextval('public.agencia_idagencia_seq'::regclass);


--
-- Name: grupo idgrupo; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grupo ALTER COLUMN idgrupo SET DEFAULT nextval('public.grupo_idgrupo_seq'::regclass);


--
-- Name: hotel idhotel; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hotel ALTER COLUMN idhotel SET DEFAULT nextval('public.hotel_idhotel_seq'::regclass);


--
-- Name: pais idpais; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pais ALTER COLUMN idpais SET DEFAULT nextval('public.pais_idpais_seq'::regclass);


--
-- Name: pessoa idpessoa; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pessoa ALTER COLUMN idpessoa SET DEFAULT nextval('public.pessoa_idpessoa_seq'::regclass);


--
-- Name: viagem idviagem; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.viagem ALTER COLUMN idviagem SET DEFAULT nextval('public.viagem_idviagem_seq'::regclass);


--
-- Data for Name: agencia; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.agencia (idagencia, nmagencia, vltxagencia) FROM stdin;
1	SkyWays	450
\.


--
-- Data for Name: grupo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.grupo (idgrupo) FROM stdin;
1
2
\.


--
-- Data for Name: hotel; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.hotel (idhotel, nmhotel, vlhotel, idpais) FROM stdin;
1	Copacabana Palace	1200	3
2	Fasano Rio	950	3
3	Emiliano São Paulo	850	3
4	Hotel Adlon Kempinski Berlin	1100	1
5	Bayerischer Hof Munich	1050	1
6	The Fontenay Hamburg	980	1
7	Pestana Palace Lisboa	900	2
8	The Yeatman Porto	950	2
9	Vila Vita Parc Algarve	1100	2
\.


--
-- Data for Name: pais; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pais (idpais, nmpais, vlpassagem, img) FROM stdin;
1	Alemanha	3200	https://images.pexels.com/photos/109629/pexels-photo-109629.jpeg
2	Portugal	2100	https://images.pexels.com/photos/3330202/pexels-photo-3330202.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
3	Brasil	2000	https://images.pexels.com/photos/10354052/pexels-photo-10354052.jpeg
\.


--
-- Data for Name: pessoa; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pessoa (idpessoa, nmpessoa, idgrupo) FROM stdin;
1	Ana Schmidt	1
2	Carlos Becker	1
3	João Müller	1
4	Mariana Costa	2
5	Pedro Silva	2
\.


--
-- Data for Name: viagem; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.viagem (idviagem, vlviagem, idpais, idgrupo, idhotel, idagencia, qntpessoas, dtviagem) FROM stdin;
9	2200	1	0	4	1	2	0001-01-01
10	2550	3	0	3	1	3	1111-01-01
\.


--
-- Name: agencia_idagencia_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.agencia_idagencia_seq', 1, true);


--
-- Name: grupo_idgrupo_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.grupo_idgrupo_seq', 2, true);


--
-- Name: hotel_idhotel_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.hotel_idhotel_seq', 2, true);


--
-- Name: pais_idpais_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pais_idpais_seq', 2, true);


--
-- Name: pessoa_idpessoa_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pessoa_idpessoa_seq', 5, true);


--
-- Name: viagem_idviagem_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.viagem_idviagem_seq', 11, true);


--
-- Name: agencia agencia_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agencia
    ADD CONSTRAINT agencia_pkey PRIMARY KEY (idagencia);


--
-- Name: grupo grupo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.grupo
    ADD CONSTRAINT grupo_pkey PRIMARY KEY (idgrupo);


--
-- Name: hotel hotel_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hotel
    ADD CONSTRAINT hotel_pkey PRIMARY KEY (idhotel);


--
-- Name: pais pais_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pais
    ADD CONSTRAINT pais_pkey PRIMARY KEY (idpais);


--
-- Name: pessoa pessoa_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pessoa
    ADD CONSTRAINT pessoa_pkey PRIMARY KEY (idpessoa);


--
-- Name: viagem viagem_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.viagem
    ADD CONSTRAINT viagem_pkey PRIMARY KEY (idviagem);


--
-- Name: hotel fk_hotel_pais; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hotel
    ADD CONSTRAINT fk_hotel_pais FOREIGN KEY (idpais) REFERENCES public.pais(idpais);


--
-- Name: pessoa fk_pessoa_grupo; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pessoa
    ADD CONSTRAINT fk_pessoa_grupo FOREIGN KEY (idgrupo) REFERENCES public.grupo(idgrupo) ON DELETE RESTRICT;


--
-- Name: viagem fk_viagem_agencia; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.viagem
    ADD CONSTRAINT fk_viagem_agencia FOREIGN KEY (idagencia) REFERENCES public.agencia(idagencia) ON DELETE CASCADE;


--
-- Name: viagem fk_viagem_hotel; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.viagem
    ADD CONSTRAINT fk_viagem_hotel FOREIGN KEY (idhotel) REFERENCES public.hotel(idhotel) ON DELETE CASCADE;


--
-- Name: viagem fk_viagem_pais; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.viagem
    ADD CONSTRAINT fk_viagem_pais FOREIGN KEY (idpais) REFERENCES public.pais(idpais) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

