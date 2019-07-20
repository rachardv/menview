
--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.users (id, name, email, password, account_type) FROM stdin;
1	bob	abc@123.ca	password account_type
2	terry	cde@123.ca	notpassword	beef
3	janice	fgh@123.ca	safepassword	cheese
\.


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);

