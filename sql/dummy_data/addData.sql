INSERT INTO privilege(title, summary) values('While user D still does this', 'Another privilege more??'); 
INSERT INTO privilege(title, summary) values('And user C does this', 'Another privilege more??'); 
INSERT INTO privilege(title, summary) values('User A does this', 'This is a privilege'); 
INSERT INTO privilege(title, summary) values('User B does this other thing', 'Another privilege more??'); 
INSERT INTO privilege(title, summary) values('And user C does this', 'This is another privilege'); 
INSERT INTO privilege(title, summary) values('User B does this other thing', 'This is a privilege'); 
INSERT INTO privilege(title, summary) values('User B does this other thing', 'Another privilege more??'); 
INSERT INTO privilege(title, summary) values('User A does this', 'This is a privilege'); 
INSERT INTO privilege(title, summary) values('User B does this other thing', 'This is another privilege'); 
INSERT INTO privilege(title, summary) values('User B does this other thing', 'This is a privilege'); 

INSERT INTO role(title) values('Colaborator'); 
INSERT INTO role(title) values('Department Leader'); 
INSERT INTO role(title) values('Human Resources'); 

INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(3, 5); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(3, 4); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(3, 10); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(2, 1); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(3, 8); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(3, 3); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(1, 9); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(1, 7); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(1, 7); 
INSERT INTO rolePrivilege(roleIDFK, privilegeIDFK) values(1, 7); 

INSERT INTO country(title) values('Mexico'); 
INSERT INTO country(title) values('United States'); 
INSERT INTO country(title) values('Colombia'); 
INSERT INTO country(title) values('Argentina'); 

INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Fernando', 'Torres', 'jkkhxxfljgm@yahoo.com', 'amwiqgvxnhwwm', FALSE, 57016, '429.A', 'Avenida Morelos', 'Colonia San José', 2, TRUE, 2, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Patricia', 'Fernández', 'vdovjahpm@outlook.com', 'wvjtidl', TRUE, 61106, '935.C', 'Calle Vicente Guerrero', 'Colonia Nuevo Milenio', 2, FALSE, 1, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Enrique', 'Hernández', 'dsgllus@nuclea.solutions', 'byvwhaiepf', FALSE, 63829, '674.A', 'Calle Juárez', 'Colonia Los Ángeles', 1, FALSE, 2, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Elena', 'González', 'vrghdccgq@nuclea.solutions', 'bdcidkour', TRUE, 39277, '142.C', 'Calle del Sol', 'Colonia San José', 0, FALSE, 3, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Rafael', 'Fernández', 'xutewvkpitq@yahoo.com', 'npqxflqg', FALSE, 47611, '752.C', 'Calle de la Paz', 'Colonia Reforma', 2, TRUE, 2, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Enrique', 'Pérez', 'dcpnvjgvg@yahoo.com', 'egrwmgjkbf', TRUE, 10178, '361.C', 'Avenida Revolución', 'Colonia Jardines de Querétaro', 1, TRUE, 1, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Pedro', 'Ruiz', 'allltjrvmaegr@yahoo.com', 'cgenthskj', FALSE, 48880, '745.C', 'Calle de la Esperanza', 'Colonia Morelos', 1, TRUE, 3, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Javier', 'Sánchez', 'pgbjiiprw@yahoo.com', 'wrhwihitudgp', FALSE, 23729, '69.B', 'Avenida Madero', 'Colonia San Francisco', 0, FALSE, 3, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('David', 'Díaz', 'wxlqvfrll@gmail.com', 'eykacqrfljl', TRUE, 66620, '309.B', 'Calle de la Virgen', 'Colonia San José', 2, FALSE, 1, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Rafael', 'Martínez', 'aiaxptjdcpda@gmail.com', 'qasvldkb', FALSE, 19162, '929.C', 'Avenida Madero', 'Colonia Nuevo Milenio', 0, TRUE, 2, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Pedro', 'Gómez', 'jaybmueup@nuclea.solutions', 'gsojpxjaahrtt', FALSE, 66267, '188.C', 'Calle de la Amistad', 'Colonia El Campanario', 2, FALSE, 3, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('David', 'Martínez', 'bpshlieb@gmail.com', 'llbtdxnbwy', TRUE, 77800, '394.C', 'Avenida de la Solidaridad', 'Colonia Santa Rosa', 3, TRUE, 3, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Mercedes', 'Vázquez', 'pkgyqjvcutxx@yahoo.com', 'bkxbayxadu', TRUE, 66950, '278.A', 'Avenida Morelos', 'Colonia Morelos', 0, TRUE, 1, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Lucía', 'Díaz', 'qdmsxjtx@nuclea.solutions', 'bhrxkknx', FALSE, 46827, '607.C', 'Calle de la Esperanza', 'Colonia Jardines de Querétaro', 0, FALSE, 2, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Francisco', 'Torres', 'sotnodhndbqar@outlook.com', 'yqeydqnb', TRUE, 89446, '217.C', 'Avenida Constituyentes', 'Colonia Emiliano Zapata', 2, TRUE, 2, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Fernando', 'López', 'tyhwrhqjscd@nuclea.solutions', 'uxbfdvtyj', FALSE, 70253, '799.A', 'Calle Vicente Guerrero', 'Colonia Nuevo Milenio', 1, TRUE, 1, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Ana', 'Torres', 'gcvrwaubm@nuclea.solutions', 'hbdgmmkin', FALSE, 67752, '45.C', 'Avenida de la Luz', 'Colonia El Mirador', 3, FALSE, 1, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Laura', 'Fernández', 'vatkgxtolm@gmail.com', 'ylgmvocqwktu', TRUE, 78046, '796.C', 'Avenida de la Libertad', 'Colonia San Francisco', 3, FALSE, 2, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('José', 'López', 'rnisjwevbedxx@outlook.com', 'kkjwefax', TRUE, 79207, '125.A', 'Avenida de la Juventud', 'Colonia del Sol', 2, FALSE, 1, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Ana', 'Fernández', 'vxrjnkuypya@nuclea.solutions', 'rmtuomiwhtwnq', FALSE, 50835, '388.B', 'Avenida Madero', 'Colonia El Laurel', 3, FALSE, 2, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Susana', 'Gómez', 'ndyplpci@outlook.com', 'bbwotaiqxaco', TRUE, 75419, '121.B', 'Avenida de la Solidaridad', 'Colonia Santa Rosa', 1, TRUE, 1, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Ana', 'González', 'mdsueaonhk@yahoo.com', 'muffvfkksjay', FALSE, 32043, '103.B', 'Calle de la Amistad', 'Colonia San José', 1, TRUE, 2, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Fernando', 'González', 'rfftutbhj@yahoo.com', 'wfwifxvv', TRUE, 39512, '206.C', 'Calle de la Luna', 'Colonia Morelos', 2, TRUE, 3, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Pedro', 'Fernández', 'purlrlnywpohg@outlook.com', 'rdoacmx', TRUE, 93462, '489.C', 'Calle de los Abetos', 'Colonia Las Águilas', 0, TRUE, 1, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Rafael', 'Pérez', 'rpxaahdcr@outlook.com', 'wyhlmaielarb', FALSE, 78393, '403.B', 'Avenida de la Libertad', 'Colonia El Mirador', 1, TRUE, 2, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Raquel', 'Díaz', 'qgtialponrqa@nuclea.solutions', 'tvsfxnhagbrh', TRUE, 62244, '576.B', 'Avenida de la Solidaridad', 'Colonia Emiliano Zapata', 2, TRUE, 1, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Rafael', 'Ruiz', 'foyxdmru@gmail.com', 'yfwggow', TRUE, 29815, '374.A', 'Calle de la Corregidora', 'Colonia Jardines de Querétaro', 2, FALSE, 2, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Elena', 'Torres', 'hbwuttj@gmail.com', 'jqegwmwvci', TRUE, 36979, '232.A', 'Calle de la Luna', 'Colonia Santa Fe', 2, FALSE, 1, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Juan', 'Moreno', 'nocwxwcgolny@gmail.com', 'pnfoadkelovvr', TRUE, 15774, '354.A', 'Avenida de la Juventud', 'Colonia El Laurel', 1, FALSE, 3, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Patricia', 'Rodríguez', 'oisduhfuwptc@outlook.com', 'xdtqxmemr', FALSE, 18532, '776.C', 'Calle 5 de Febrero', 'Colonia El Campanario', 3, TRUE, 2, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Raquel', 'Sánchez', 'ijlhbijr@gmail.com', 'rfsjlfxtb', FALSE, 83854, '72.A', 'Calle de los Naranjos', 'Colonia Santa Rosa', 1, TRUE, 3, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Ana', 'Martínez', 'hfyarklphyxk@nuclea.solutions', 'konvuorvshge', FALSE, 82053, '766.C', 'Calle Vicente Guerrero', 'Colonia Morelos', 3, FALSE, 3, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Roberto', 'Pérez', 'veqlmqjyiwq@outlook.com', 'obcuyrde', FALSE, 66071, '495.C', 'Calle del Carmen', 'Colonia Valle Verde', 1, FALSE, 1, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Elena', 'Díaz', 'mpujepkamk@outlook.com', 'frqkvkpsqigdb', FALSE, 33259, '586.B', 'Calle 5 de Febrero', 'Colonia Jardines de Querétaro', 3, TRUE, 2, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Francisco', 'Martínez', 'dlwynfe@nuclea.solutions', 'dbykgdflpugyb', TRUE, 56758, '549.A', 'Avenida de la Juventud', 'Colonia Las Águilas', 0, FALSE, 2, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Isabel', 'Hernández', 'aoholiesmpe@nuclea.solutions', 'fifsxcb', FALSE, 28323, '881.C', 'Calle de la Luna', 'Colonia El Cerrito', 2, TRUE, 3, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Laura', 'Gómez', 'tnmgdtlt@outlook.com', 'tppvrrctgl', TRUE, 52013, '373.A', 'Avenida de los Insurgentes', 'Colonia Los Ángeles', 2, FALSE, 1, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Patricia', 'Torres', 'qyvghyasunb@yahoo.com', 'vpbpruw', TRUE, 16705, '536.A', 'Calle Corregidora', 'Colonia El Mirador', 2, TRUE, 2, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Isabel', 'Moreno', 'scmidcapxnqr@nuclea.solutions', 'ottmsyumaqs', FALSE, 20313, '235.A', 'Avenida de la Libertad', 'Colonia Lomas de Querétaro', 3, FALSE, 3, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Pedro', 'Torres', 'rkgiltbdqaiad@nuclea.solutions', 'hccaltuo', FALSE, 70895, '252.A', 'Avenida de los Arcos', 'Colonia Emiliano Zapata', 0, FALSE, 1, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Antonio', 'Martínez', 'eiferfjihqb@nuclea.solutions', 'xfyglsrrd', FALSE, 41279, '370.C', 'Calle Juárez', 'Colonia El Mirador', 0, FALSE, 3, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Elena', 'Pérez', 'yfuixxis@yahoo.com', 'heeykjmosr', FALSE, 12719, '261.C', 'Calle de la Estación', 'Colonia San José', 0, FALSE, 2, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('María', 'Gómez', 'ddfbdqtadp@nuclea.solutions', 'onibbwtuu', TRUE, 96135, '480.A', 'Calle Vicente Guerrero', 'Colonia Emiliano Zapata', 0, TRUE, 2, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Pedro', 'López', 'cjgwlkohjql@nuclea.solutions', 'wnasjvbiy', FALSE, 46446, '680.A', 'Calle Juárez', 'Colonia El Campanario', 3, FALSE, 2, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Fernando', 'Díaz', 'lleqmmbkplut@gmail.com', 'icdqdligupdic', FALSE, 54824, '558.B', 'Calle Zaragoza', 'Colonia La Pradera', 3, FALSE, 1, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Isabel', 'Gómez', 'gkdkwsvtop@yahoo.com', 'xrpcmin', TRUE, 40406, '348.C', 'Calle Zaragoza', 'Colonia La Pradera', 2, FALSE, 3, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('José', 'Moreno', 'ighayxmwsxr@nuclea.solutions', 'ovfbgsbubnxl', TRUE, 45794, '821.A', 'Calle de la Esperanza', 'Colonia Emiliano Zapata', 3, FALSE, 3, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Raquel', 'Hernández', 'vrnprjmo@outlook.com', 'bdcypqraaycy', TRUE, 42504, '119.B', 'Calle de los Cedros', 'Colonia El Cerrito', 0, FALSE, 3, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Lucía', 'Vázquez', 'lyoyoommc@outlook.com', 'txltxmvxlmtga', TRUE, 46002, '48.A', 'Avenida de la Constitución', 'Colonia El Laurel', 1, FALSE, 3, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Raquel', 'Martínez', 'sscxegwvuqffy@outlook.com', 'dghpbpqnremje', TRUE, 43855, '554.A', 'Calle de la Merced', 'Colonia Nuevo Milenio', 1, FALSE, 2, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Pedro', 'González', 'ixddqkiruxm@outlook.com', 'cwhiwaby', FALSE, 73490, '165.A', 'Avenida de la Constitución', 'Colonia El Cerrito', 2, TRUE, 3, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Ana', 'Jiménez', 'iscskytajs@outlook.com', 'cvyfuaof', FALSE, 52394, '839.B', 'Calle de la Paz', 'Colonia San Francisco', 1, FALSE, 1, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Isabel', 'González', 'jaillefnwlbg@yahoo.com', 'cmbebieuty', FALSE, 47202, '691.A', 'Avenida Morelos', 'Colonia San Francisco', 3, FALSE, 2, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('José', 'Díaz', 'hoplxks@outlook.com', 'agnyhdlinwt', TRUE, 71819, '21.C', 'Calle de la Santa Cruz', 'Colonia La Pradera', 1, FALSE, 1, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Isabel', 'Vázquez', 'iuxygvjbgbi@outlook.com', 'vqiyesoe', TRUE, 89605, '989.A', 'Calle de la Luna', 'Colonia Los Ángeles', 0, FALSE, 1, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('María', 'Sánchez', 'maqklurndd@yahoo.com', 'plwgrkn', TRUE, 73816, '490.B', 'Avenida Morelos', 'Colonia Centro', 1, FALSE, 1, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Alberto', 'Pérez', 'wyqkevaow@nuclea.solutions', 'pplicajmmj', FALSE, 46652, '345.C', 'Calle de la Esperanza', 'Colonia Emiliano Zapata', 1, FALSE, 2, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Javier', 'Rodríguez', 'mmkxqjafgeaxd@gmail.com', 'srfcftn', FALSE, 25785, '992.C', 'Avenida de los Insurgentes', 'Colonia El Laurel', 3, FALSE, 2, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Pedro', 'Sánchez', 'kpbknedqxqq@yahoo.com', 'mqjxkwkxud', FALSE, 14755, '898.B', 'Avenida de la Solidaridad', 'Colonia del Sol', 1, FALSE, 3, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Roberto', 'Vázquez', 'gnhggxrudtb@nuclea.solutions', 'fhbckkywac', TRUE, 98583, '641.C', 'Calle de la Paz', 'Colonia Jardines de Querétaro', 3, FALSE, 2, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Javier', 'González', 'efgygusgi@nuclea.solutions', 'ctbfvluecck', FALSE, 18542, '90.A', 'Calle de la Amistad', 'Colonia Los Ángeles', 0, FALSE, 2, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Francisco', 'Moreno', 'xhqeejm@nuclea.solutions', 'sfrahwkr', TRUE, 33297, '4.C', 'Avenida de la Juventud', 'Colonia San Francisco', 0, TRUE, 3, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Pedro', 'López', 'kpcrwnemelvq@gmail.com', 'nhlhhsetm', FALSE, 27691, '443.B', 'Avenida de los Arcos', 'Colonia Morelos', 0, TRUE, 2, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Carlos', 'Martínez', 'ihwpvebuu@nuclea.solutions', 'okqcseo', FALSE, 72419, '752.B', 'Avenida de los Arcos', 'Colonia Nuevo Milenio', 2, TRUE, 1, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Fernando', 'Jiménez', 'kphmevew@yahoo.com', 'nisrdaiojrvij', TRUE, 97423, '546.A', 'Calle de la Paz', 'Colonia del Sol', 2, FALSE, 1, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Rafael', 'Moreno', 'pgxyuev@yahoo.com', 'irnrllc', TRUE, 47533, '77.A', 'Calle Corregidora', 'Colonia del Sol', 2, FALSE, 3, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Adrián', 'Jiménez', 'rgisfdwbfb@yahoo.com', 'ahrsulej', FALSE, 55341, '301.B', 'Calle de la Paz', 'Colonia Las Águilas', 3, TRUE, 2, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Javier', 'Moreno', 'ovaqolxi@outlook.com', 'cwqpcceeummp', TRUE, 21507, '728.C', 'Avenida Madero', 'Colonia del Sol', 1, TRUE, 1, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Isabel', 'Torres', 'ewwepopnwc@gmail.com', 'qvsusgj', TRUE, 11964, '902.A', 'Calle 5 de Febrero', 'Colonia Los Ángeles', 1, TRUE, 3, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Lucía', 'Hernández', 'vlkxmxn@outlook.com', 'enjwvuhwyfvd', FALSE, 20583, '23.C', 'Calle Corregidora', 'Colonia Morelos', 0, TRUE, 1, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Isabel', 'Pérez', 'wtywiwkho@gmail.com', 'vgvedulbb', TRUE, 63172, '158.A', 'Avenida de la Constitución', 'Colonia Valle Verde', 3, FALSE, 2, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Elena', 'Moreno', 'ohxfpnb@yahoo.com', 'anbwbcxjqugr', FALSE, 70879, '297.C', 'Calle Juárez', 'Colonia Centro', 0, TRUE, 3, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Elena', 'Moreno', 'gaigfxlp@yahoo.com', 'ncxmmpjuhglyo', TRUE, 60316, '524.C', 'Calle Hidalgo', 'Colonia El Campanario', 0, TRUE, 3, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Alberto', 'González', 'bkwgikvj@yahoo.com', 'klautnvix', TRUE, 37270, '709.A', 'Calle de los Pinos', 'Colonia Reforma', 2, TRUE, 2, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Antonio', 'Sánchez', 'uhdgdfe@gmail.com', 'bjxuxtgxywyj', TRUE, 62413, '785.A', 'Calle Juárez', 'Colonia La Pradera', 1, TRUE, 1, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Patricia', 'López', 'qvvtbavirsdme@nuclea.solutions', 'imjokimksj', TRUE, 52411, '946.C', 'Calle de la Luna', 'Colonia Valle Verde', 3, FALSE, 3, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Ana', 'Rodríguez', 'kpeduqjkie@nuclea.solutions', 'nvyglpehm', FALSE, 84651, '147.B', 'Calle de los Cedros', 'Colonia Jardines de Querétaro', 1, TRUE, 2, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Ana', 'Torres', 'lqptvehlamr@gmail.com', 'dtdhcrpnchr', TRUE, 77895, '763.B', 'Calle Benito Juárez', 'Colonia Lomas de Querétaro', 1, TRUE, 3, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Adrián', 'Gómez', 'xifjksdjohwg@outlook.com', 'wxbgqjlca', FALSE, 96005, '303.B', 'Avenida Madero', 'Colonia Jardines de Querétaro', 2, FALSE, 2, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('José', 'Torres', 'bnoimxbm@outlook.com', 'mfbojyntfw', FALSE, 21178, '163.A', 'Calle de la Virgen', 'Colonia del Sol', 0, FALSE, 1, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Enrique', 'Gómez', 'apideocvgjok@gmail.com', 'kypkojrmnrp', FALSE, 52009, '441.C', 'Avenida de los Arcos', 'Colonia Los Ángeles', 0, FALSE, 3, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Roberto', 'Fernández', 'dxgbgrrrpgev@outlook.com', 'edovgxxy', TRUE, 52790, '892.A', 'Avenida Madero', 'Colonia Valle Verde', 1, TRUE, 2, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('María', 'Hernández', 'jsfcmvkqt@nuclea.solutions', 'dfecofi', FALSE, 42045, '901.B', 'Avenida de la Juventud', 'Colonia El Campanario', 1, TRUE, 3, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Pedro', 'Ruiz', 'wewuoprjedm@nuclea.solutions', 'blvfabnor', TRUE, 10072, '783.B', 'Calle de la Amistad', 'Colonia La Pradera', 3, FALSE, 2, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Patricia', 'Gómez', 'dxaimrvfmikg@gmail.com', 'ewquosenwdl', FALSE, 40279, '598.A', 'Avenida Morelos', 'Colonia San Francisco', 2, TRUE, 2, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Roberto', 'Moreno', 'davrlhampd@nuclea.solutions', 'dnoqektcl', TRUE, 20439, '370.A', 'Avenida de la Solidaridad', 'Colonia Santa Fe', 3, FALSE, 1, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('José', 'Hernández', 'fisqpsghy@gmail.com', 'eofassf', FALSE, 21013, '174.A', 'Calle del Sol', 'Colonia El Campanario', 0, TRUE, 2, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Elena', 'López', 'nplosmyejq@yahoo.com', 'csidobibyplr', FALSE, 21446, '592.C', 'Calle Allende', 'Colonia San José', 3, FALSE, 3, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Rafael', 'Jiménez', 'dyrsxver@gmail.com', 'fbbvnufr', TRUE, 22320, '803.A', 'Avenida de la Juventud', 'Colonia El Campanario', 1, FALSE, 3, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Enrique', 'Jiménez', 'bymuijw@outlook.com', 'jasfpqmhblnb', TRUE, 48976, '880.A', 'Calle de los Cedros', 'Colonia Morelos', 3, TRUE, 3, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Mercedes', 'Sánchez', 'pwadskorqlilr@gmail.com', 'xkoktsvh', FALSE, 77141, '970.C', 'Calle 5 de Febrero', 'Colonia El Campanario', 2, TRUE, 1, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Susana', 'Rodríguez', 'qhphuauo@gmail.com', 'jcyfdpdf', FALSE, 38041, '800.C', 'Avenida de los Insurgentes', 'Colonia Emiliano Zapata', 2, TRUE, 3, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('David', 'Torres', 'nlduigqxhmpc@nuclea.solutions', 'ajtiojnu', FALSE, 39441, '394.C', 'Avenida Morelos', 'Colonia Emiliano Zapata', 3, TRUE, 1, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Javier', 'Hernández', 'aojhbajnc@yahoo.com', 'ojalpnybt', TRUE, 43449, '82.B', 'Avenida Morelos', 'Colonia del Sol', 1, TRUE, 2, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Susana', 'Torres', 'mknyxpr@gmail.com', 'swkhvndryd', FALSE, 32868, '305.B', 'Calle de la Corregidora', 'Colonia Santa Rosa', 0, TRUE, 2, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Beatriz', 'Díaz', 'ucwipvihpien@outlook.com', 'vybtoen', TRUE, 56499, '863.B', 'Calle de los Abetos', 'Colonia Reforma', 2, TRUE, 3, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Elena', 'González', 'nuydfxyw@yahoo.com', 'hvqvmcsqydiw', FALSE, 27013, '922.C', 'Calle Hidalgo', 'Colonia La Pradera', 2, TRUE, 2, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Mercedes', 'González', 'sjjvpkxo@gmail.com', 'qeujgxsd', FALSE, 60078, '789.A', 'Avenida de la Solidaridad', 'Colonia Los Ángeles', 1, FALSE, 1, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Elena', 'Torres', 'wfulhkorbpuva@gmail.com', 'rsfbygvfsjxf', FALSE, 19099, '741.B', 'Avenida de los Arcos', 'Colonia Morelos', 3, FALSE, 2, 1);
INSERT INTO user(birthName, surname, mail, passwd, passwdFlag, zipCode, houseNumber, streetName, colony, workModality, workStatus, userRoleIDFK, countryUserIDFK) VALUES('Juan', 'Vázquez', 'ddsvxrvfonu@yahoo.com', 'xpetmbbho', FALSE, 19762, '658.A', 'Avenida Madero', 'Colonia Lomas de Querétaro', 2, TRUE, 3, 1);

-- Preguntas usadas por RH de Nuclea para One on One
INSERT INTO oneOnOneQuestion (question) VALUES ('¿De qué estás orgulloso del mes pasado?');
INSERT INTO oneOnOneQuestion (question) VALUES ('¿Estás preocupado, decepcionado o estresado?');
INSERT INTO oneOnOneQuestion (question) VALUES ('¿En qué te encuentras trabajando?');
INSERT INTO oneOnOneQuestion (question) VALUES ('¿Cuál va a ser tu meta del mes?');
INSERT INTO oneOnOneQuestion (question) VALUES ('¿Qué vamos hacer para cumplir las metas?');
INSERT INTO oneOnOneQuestion (question) VALUES ('¿Tuviste alguna situación complicada en tu semana que afectara en tu trabajo?');
INSERT INTO oneOnOneQuestion (question) VALUES ('¿Cuentas con los recursos necesarios para completar tu trabajo?');
INSERT INTO oneOnOneQuestion (question) VALUES ('¿El trabajo y las entregas van en el tiempo planeado?');
INSERT INTO oneOnOneQuestion (question) VALUES ('¿A quién quiero reconocer en la semana?');

-- Registros obtenidos como base los indicadores a medir compartidos por los SF
INSERT INTO oneOnOneMeasurable (summary) VALUES ('Carga de trabajo: El colaborador siente que su carga es manejable');
INSERT INTO oneOnOneMeasurable (summary) VALUES ('Carga de trabajo: El colaborador siente que su carga es medianamente manejable');
INSERT INTO oneOnOneMeasurable (summary) VALUES ('Carga de trabajo: El colaborador siente que su carga es poco manejable');
INSERT INTO oneOnOneMeasurable (summary) VALUES ('Carga de trabajo El colaborador siente que su carga de trabajo no es manejable');
INSERT INTO oneOnOneMeasurable (summary) VALUES ('Salud fisica: El colaborador menciona tener una salud fisica excelente');
INSERT INTO oneOnOneMeasurable (summary) VALUES ('Salud fisica: El colaborador menciona tener una salud fisica buena');
INSERT INTO oneOnOneMeasurable (summary) VALUES ('Salud fisica El colaborador menciona tener una salud fisica regular');
INSERT INTO oneOnOneMeasurable (summary) VALUES ('Salud fisica El colaborador menciona tener una salud fisica un poco mala');
INSERT INTO oneOnOneMeasurable (summary) VALUES ('Salud fisica: El colaborador menciona tener una salud fisica mala');
INSERT INTO oneOnOneMeasurable (summary) VALUES ('Reconocimiento: El colaborador se siente altamente valorado por sus compañeros');
INSERT INTO oneOnOneMeasurable (summary) VALUES ('Reconocimiento: El colaborador se siente valorado por sus compañeros');
INSERT INTO oneOnOneMeasurable (summary) VALUES ('Reconocimiento: El colaborador se siente poco valorado por sus compañeros');
INSERT INTO oneOnOneMeasurable (summary) VALUES ('Reconocimiento: El colaborador no se siente valorado por sus compañeros');
INSERT INTO oneOnOneMeasurable (summary) VALUES ('Salud emocional: El colaborador se siente excelente emocionalmente y con emociones muy positivas');
INSERT INTO oneOnOneMeasurable (summary) VALUES ('Salud emocional: El colaborador se siente muy bien emocionalmente y con emociones positivas');
INSERT INTO oneOnOneMeasurable (summary) VALUES ('Salud emocional: El colaborador se siente bien emocionalmente y con emociones positivas');
INSERT INTO oneOnOneMeasurable (summary) VALUES ('Salud emocional: El colaborador se siente regular emocionalmente y con emociones poco positivas');
INSERT INTO oneOnOneMeasurable (summary) VALUES ('Salud emocional: El colaborador se siente mal emocionalmente y con emociones poco positivas');
INSERT INTO oneOnOneMeasurable (summary) VALUES ('Equilibrio: El colaborador siente que hay mucho equilibrio entre su vida personal y trabajo');
INSERT INTO oneOnOneMeasurable (summary) VALUES ('Equiilibrio: El colaborador siente que hay poco equilibrio entre su vida personal y trabajo');

-- Ejemplos de sesiones OneOnOne con colaboradores
INSERT INTO oneOnOne (expectedTime, meetingDate, oneOnOneUserIDFK) VALUES (15, '2025-03-05 09:15:00', 2);
INSERT INTO oneOnOne (expectedTime, meetingDate, oneOnOneUserIDFK) VALUES (15, '2025-03-06 09:30:00', 37);
INSERT INTO oneOnOne (expectedTime, meetingDate, oneOnOneUserIDFK) VALUES (15, '2025-03-07 09:45:00', 40);
INSERT INTO oneOnOne (expectedTime, meetingDate, oneOnOneUserIDFK) VALUES (15, '2025-03-08 10:00:00', 45);
INSERT INTO oneOnOne (expectedTime, meetingDate, oneOnOneUserIDFK) VALUES (15, '2025-03-09 10:15:00', 52);
INSERT INTO oneOnOne (expectedTime, meetingDate, oneOnOneUserIDFK) VALUES (15, '2025-03-10 12:30:00', 1);
INSERT INTO oneOnOne (expectedTime, meetingDate, oneOnOneUserIDFK) VALUES (15, '2025-03-11 12:45:00', 14);
INSERT INTO oneOnOne (expectedTime, meetingDate, oneOnOneUserIDFK) VALUES (15, '2025-03-12 13:00:00', 15);
INSERT INTO oneOnOne (expectedTime, meetingDate, oneOnOneUserIDFK) VALUES (15, '2025-03-13 13:15:00', 30);
INSERT INTO oneOnOne (expectedTime, meetingDate, oneOnOneUserIDFK) VALUES (15, '2025-03-14 13:30:00', 34);
INSERT INTO oneOnOne (expectedTime, meetingDate, oneOnOneUserIDFK) VALUES (15, '2025-03-15 13:45:00', 35);
INSERT INTO oneOnOne (expectedTime, meetingDate, oneOnOneUserIDFK) VALUES (15, '2025-03-16 14:00:00', 38);
INSERT INTO oneOnOne (expectedTime, meetingDate, oneOnOneUserIDFK) VALUES (15, '2025-03-17 09:00:00', 30);
INSERT INTO oneOnOne (expectedTime, meetingDate, oneOnOneUserIDFK) VALUES (15, '2025-03-18 09:15:00', 50);
INSERT INTO oneOnOne (expectedTime, meetingDate, oneOnOneUserIDFK) VALUES (15, '2025-03-19 16:45:00', 53);
INSERT INTO oneOnOne (expectedTime, meetingDate, oneOnOneUserIDFK) VALUES (15, '2025-03-20 16:45:00', 57);
INSERT INTO oneOnOne (expectedTime, meetingDate, oneOnOneUserIDFK) VALUES (15, '2025-03-21 15:30:00', 1);
INSERT INTO oneOnOne (expectedTime, meetingDate, oneOnOneUserIDFK) VALUES (15, '2025-03-22 15:00:00', 14);
INSERT INTO oneOnOne (expectedTime, meetingDate, oneOnOneUserIDFK) VALUES (15, '2025-03-23 15:15:00', 42);
INSERT INTO oneOnOne (expectedTime, meetingDate, oneOnOneUserIDFK) VALUES (15, '2025-03-24 09:45:00', 44);
INSERT INTO oneOnOne (expectedTime, meetingDate, oneOnOneUserIDFK) VALUES (15, '2025-05-05 09:15:00', 2);
INSERT INTO oneOnOne (expectedTime, meetingDate, oneOnOneUserIDFK) VALUES (15, '2025-05-06 09:30:00', 37);
INSERT INTO oneOnOne (expectedTime, meetingDate, oneOnOneUserIDFK) VALUES (15, '2025-05-07 09:45:00', 40);
INSERT INTO oneOnOne (expectedTime, meetingDate, oneOnOneUserIDFK) VALUES (15, '2025-05-08 10:00:00', 45);
INSERT INTO oneOnOne (expectedTime, meetingDate, oneOnOneUserIDFK) VALUES (15, '2025-05-09 10:15:00', 52);
INSERT INTO oneOnOne (expectedTime, meetingDate, oneOnOneUserIDFK) VALUES (15, '2025-05-10 12:30:00', 1);
INSERT INTO oneOnOne (expectedTime, meetingDate, oneOnOneUserIDFK) VALUES (15, '2025-05-11 12:45:00', 14);
INSERT INTO oneOnOne (expectedTime, meetingDate, oneOnOneUserIDFK) VALUES (15, '2025-05-12 13:00:00', 15);
INSERT INTO oneOnOne (expectedTime, meetingDate, oneOnOneUserIDFK) VALUES (15, '2025-05-13 13:15:00', 30);
INSERT INTO oneOnOne (expectedTime, meetingDate, oneOnOneUserIDFK) VALUES (15, '2025-05-14 13:30:00', 34);
INSERT INTO oneOnOne (expectedTime, meetingDate, oneOnOneUserIDFK) VALUES (15, '2025-04-15 13:45:00', 35);
INSERT INTO oneOnOne (expectedTime, meetingDate, oneOnOneUserIDFK) VALUES (15, '2025-04-16 14:00:00', 38);
INSERT INTO oneOnOne (expectedTime, meetingDate, oneOnOneUserIDFK) VALUES (15, '2025-05-17 09:00:00', 30);
INSERT INTO oneOnOne (expectedTime, meetingDate, oneOnOneUserIDFK) VALUES (15, '2025-05-18 09:15:00', 50);
INSERT INTO oneOnOne (expectedTime, meetingDate, oneOnOneUserIDFK) VALUES (15, '2025-05-19 16:45:00', 53);
INSERT INTO oneOnOne (expectedTime, meetingDate, oneOnOneUserIDFK) VALUES (15, '2025-05-20 16:45:00', 57);
INSERT INTO oneOnOne (expectedTime, meetingDate, oneOnOneUserIDFK) VALUES (15, '2025-05-21 15:30:00', 1);
INSERT INTO oneOnOne (expectedTime, meetingDate, oneOnOneUserIDFK) VALUES (15, '2025-05-22 15:00:00', 14);
INSERT INTO oneOnOne (expectedTime, meetingDate, oneOnOneUserIDFK) VALUES (15, '2025-05-23 15:15:00', 42);
INSERT INTO oneOnOne (expectedTime, meetingDate, oneOnOneUserIDFK) VALUES (15, '2025-05-24 09:45:00', 44);
INSERT INTO oneOnOne (expectedTime, meetingDate, oneOnOneUserIDFK) VALUES (15, '2025-03-31 09:15:00', 2);
INSERT INTO oneOnOne (expectedTime, meetingDate, oneOnOneUserIDFK) VALUES (15, '2025-03-29 09:30:00', 37);
INSERT INTO oneOnOne (expectedTime, meetingDate, oneOnOneUserIDFK) VALUES (15, '2025-03-22 09:45:00', 40);
INSERT INTO oneOnOne (expectedTime, meetingDate, oneOnOneUserIDFK) VALUES (15, '2025-03-28 10:00:00', 45);
INSERT INTO oneOnOne (expectedTime, meetingDate, oneOnOneUserIDFK) VALUES (15, '2025-03-22 10:15:00', 52);
INSERT INTO oneOnOne (expectedTime, meetingDate, oneOnOneUserIDFK) VALUES (15, '2025-03-28 12:30:00', 1);
INSERT INTO oneOnOne (expectedTime, meetingDate, oneOnOneUserIDFK) VALUES (15, '2025-03-25 12:45:00', 14);
INSERT INTO oneOnOne (expectedTime, meetingDate, oneOnOneUserIDFK) VALUES (15, '2025-03-21 13:00:00', 15);
INSERT INTO oneOnOne (expectedTime, meetingDate, oneOnOneUserIDFK) VALUES (15, '2025-03-20 13:15:00', 30);
INSERT INTO oneOnOne (expectedTime, meetingDate, oneOnOneUserIDFK) VALUES (15, '2025-03-20 13:30:00', 34);
INSERT INTO oneOnOne (expectedTime, meetingDate, oneOnOneUserIDFK) VALUES (15, '2025-03-20 13:45:00', 35);

-- Registros para oneOnOneAnswer (50 registros)
INSERT INTO oneOnOneAnswer (answer, answerOneOnOneIDFK, questionIDFK) VALUES ('Me siento orgulloso de haber cumplido mis objetivos en el proyecto X, lo que me permitió crecer profesionalmente.', 6, 1);
INSERT INTO oneOnOneAnswer (answer, answerOneOnOneIDFK, questionIDFK) VALUES ('En general, me siento tranquilo, aunque reconozco que en algunas situaciones se presenta algo de estrés que manejo con calma.', 17, 2);
INSERT INTO oneOnOneAnswer (answer, answerOneOnOneIDFK, questionIDFK) VALUES ('Actualmente estoy enfocado en el desarrollo del proyecto Y, colaborando estrechamente con mi equipo para alcanzar los objetivos.', 1, 3);
INSERT INTO oneOnOneAnswer (answer, answerOneOnOneIDFK, questionIDFK) VALUES ('Mi meta es finalizar el proyecto pendiente y comenzar a implementar nuevas estrategias para mejorar la productividad.', 7, 4);
INSERT INTO oneOnOneAnswer (answer, answerOneOnOneIDFK, questionIDFK) VALUES ('Vamos a fomentar la comunicación continua y a utilizar herramientas de gestión que nos ayuden a monitorear el progreso.', 18, 5);
INSERT INTO oneOnOneAnswer (answer, answerOneOnOneIDFK, questionIDFK) VALUES ('Sí, hubo un imprevisto en la coordinación del equipo, pero logramos resolverlo a tiempo con la colaboración de todos.', 3, 6);
INSERT INTO oneOnOneAnswer (answer, answerOneOnOneIDFK, questionIDFK) VALUES ('Sí, cuento con las herramientas y el apoyo necesario, lo que me permite avanzar sin mayores inconvenientes.', 19, 7);
INSERT INTO oneOnOneAnswer (answer, answerOneOnOneIDFK, questionIDFK) VALUES ('La mayoría de las entregas están en línea con el cronograma, aunque se requieren pequeños ajustes en algunas tareas.', 20, 8);
INSERT INTO oneOnOneAnswer (answer, answerOneOnOneIDFK, questionIDFK) VALUES ('Me gustaría reconocer a Joel por su dedicación y por haber contribuido significativamente a resolver los problemas surgidos.', 4, 9);
INSERT INTO oneOnOneAnswer (answer, answerOneOnOneIDFK, questionIDFK) VALUES ('Me siento orgulloso de haber cumplido mis objetivos en el proyecto X, lo que me permitió crecer profesionalmente.', 14, 1);
INSERT INTO oneOnOneAnswer (answer, answerOneOnOneIDFK, questionIDFK) VALUES ('Me siento orgulloso de haber cumplido mis objetivos en el proyecto X, lo que me permitió crecer profesionalmente.', 1, 1);
INSERT INTO oneOnOneAnswer (answer, answerOneOnOneIDFK, questionIDFK) VALUES ('En general, me siento tranquilo, aunque reconozco que en algunas situaciones se presenta algo de estrés que manejo con calma.', 7, 2);
INSERT INTO oneOnOneAnswer (answer, answerOneOnOneIDFK, questionIDFK) VALUES ('Actualmente estoy enfocado en el desarrollo del proyecto Y, colaborando estrechamente con mi equipo para alcanzar los objetivos.', 15, 3);
INSERT INTO oneOnOneAnswer (answer, answerOneOnOneIDFK, questionIDFK) VALUES ('Mi meta es finalizar el proyecto pendiente y comenzar a implementar nuevas estrategias para mejorar la productividad.', 16, 4);
INSERT INTO oneOnOneAnswer (answer, answerOneOnOneIDFK, questionIDFK) VALUES ('Vamos a fomentar la comunicación continua y a utilizar herramientas de gestión que nos ayuden a monitorear el progreso.', 15, 5);
INSERT INTO oneOnOneAnswer (answer, answerOneOnOneIDFK, questionIDFK) VALUES ('Sí, hubo un imprevisto en la coordinación del equipo, pero logramos resolverlo a tiempo con la colaboración de todos.', 16, 6);
INSERT INTO oneOnOneAnswer (answer, answerOneOnOneIDFK, questionIDFK) VALUES ('Sí, cuento con las herramientas y el apoyo necesario, lo que me permite avanzar sin mayores inconvenientes.', 17, 7);
INSERT INTO oneOnOneAnswer (answer, answerOneOnOneIDFK, questionIDFK) VALUES ('La mayoría de las entregas están en línea con el cronograma, aunque se requieren pequeños ajustes en algunas tareas.', 18, 8);
INSERT INTO oneOnOneAnswer (answer, answerOneOnOneIDFK, questionIDFK) VALUES ('Me gustaría reconocer a Fernando por su dedicación y por haber contribuido significativamente a resolver los problemas surgidos.', 19, 9);
INSERT INTO oneOnOneAnswer (answer, answerOneOnOneIDFK, questionIDFK) VALUES ('Vamos a fomentar la comunicación continua y a utilizar herramientas de gestión que nos ayuden a monitorear el progreso.', 5, 7);
INSERT INTO oneOnOneAnswer (answer, answerOneOnOneIDFK, questionIDFK) VALUES ('Me siento orgulloso de haber cumplido mis objetivos en el proyecto X, lo que me permitió crecer profesionalmente.', 6, 1);
INSERT INTO oneOnOneAnswer (answer, answerOneOnOneIDFK, questionIDFK) VALUES ('En general, me siento tranquilo, aunque reconozco que en algunas situaciones se presenta algo de estrés que manejo con calma.', 2, 2);
INSERT INTO oneOnOneAnswer (answer, answerOneOnOneIDFK, questionIDFK) VALUES ('Me encuentro trabajando en la optimización de procesos internos y en la implementación de mejoras para el próximo trimestre.', 3, 3);
INSERT INTO oneOnOneAnswer (answer, answerOneOnOneIDFK, questionIDFK) VALUES ('Mi meta es finalizar el proyecto pendiente y comenzar a implementar nuevas estrategias para mejorar la productividad.', 4, 4);
INSERT INTO oneOnOneAnswer (answer, answerOneOnOneIDFK, questionIDFK) VALUES ('Vamos a fomentar la comunicación continua y a utilizar herramientas de gestión que nos ayuden a monitorear el progreso.', 5, 5);
INSERT INTO oneOnOneAnswer (answer, answerOneOnOneIDFK, questionIDFK) VALUES ('Sí, hubo un imprevisto en la coordinación del equipo, pero logramos resolverlo a tiempo con la colaboración de todos.', 6, 6);
INSERT INTO oneOnOneAnswer (answer, answerOneOnOneIDFK, questionIDFK) VALUES ('En general tengo lo necesario, aunque en algunas áreas podría beneficiarme de recursos adicionales para acelerar ciertos procesos.', 7, 7);
INSERT INTO oneOnOneAnswer (answer, answerOneOnOneIDFK, questionIDFK) VALUES ('La mayoría de las entregas están en línea con el cronograma, aunque se requieren pequeños ajustes en algunas tareas.', 8, 8);
INSERT INTO oneOnOneAnswer (answer, answerOneOnOneIDFK, questionIDFK) VALUES ('Quiero destacar el esfuerzo y la colaboración de todo el equipo, que ha sido fundamental para alcanzar los objetivos planteados.', 9, 9);
INSERT INTO oneOnOneAnswer (answer, answerOneOnOneIDFK, questionIDFK) VALUES ('En general, me siento tranquilo, aunque reconozco que en algunas situaciones se presenta algo de estrés que manejo con calma.', 10, 2);
INSERT INTO oneOnOneAnswer (answer, answerOneOnOneIDFK, questionIDFK) VALUES ('Me siento orgulloso de haber cumplido mis objetivos en el proyecto X, lo que me permitió crecer profesionalmente.', 11, 1);
INSERT INTO oneOnOneAnswer (answer, answerOneOnOneIDFK, questionIDFK) VALUES ('Si bien hubo momentos de presión, no me siento decepcionado y estoy enfocado en encontrar soluciones.', 12, 2);
INSERT INTO oneOnOneAnswer (answer, answerOneOnOneIDFK, questionIDFK) VALUES ('Me encuentro trabajando en la optimización de procesos internos y en la implementación de mejoras para el próximo trimestre.', 13, 3);
INSERT INTO oneOnOneAnswer (answer, answerOneOnOneIDFK, questionIDFK) VALUES ('Mi meta es finalizar el proyecto pendiente y comenzar a implementar nuevas estrategias para mejorar la productividad.', 14, 4);
INSERT INTO oneOnOneAnswer (answer, answerOneOnOneIDFK, questionIDFK) VALUES ('Planeamos definir un plan de acción detallado, distribuir responsabilidades claramente y realizar seguimientos semanales para ajustar el rumbo si es necesario.', 15, 5);
INSERT INTO oneOnOneAnswer (answer, answerOneOnOneIDFK, questionIDFK) VALUES ('Sí, hubo un imprevisto en la coordinación del equipo, pero logramos resolverlo a tiempo con la colaboración de todos.', 16, 6);
INSERT INTO oneOnOneAnswer (answer, answerOneOnOneIDFK, questionIDFK) VALUES ('En general tengo lo necesario, aunque en algunas áreas podría beneficiarme de recursos adicionales para acelerar ciertos procesos.', 17, 7);
INSERT INTO oneOnOneAnswer (answer, answerOneOnOneIDFK, questionIDFK) VALUES ('La mayoría de las entregas están en línea con el cronograma, aunque se requieren pequeños ajustes en algunas tareas.', 18, 8);
INSERT INTO oneOnOneAnswer (answer, answerOneOnOneIDFK, questionIDFK) VALUES ('Quiero destacar el esfuerzo y la colaboración de todo el equipo, que ha sido fundamental para alcanzar los objetivos planteados.', 19, 9);
INSERT INTO oneOnOneAnswer (answer, answerOneOnOneIDFK, questionIDFK) VALUES ('Mi meta es finalizar el proyecto pendiente y comenzar a implementar nuevas estrategias para mejorar la productividad.', 13, 4);
INSERT INTO oneOnOneAnswer (answer, answerOneOnOneIDFK, questionIDFK) VALUES ('Me siento orgulloso de haber cumplido mis objetivos en el proyecto X, lo que me permitió crecer profesionalmente.', 11, 1);
INSERT INTO oneOnOneAnswer (answer, answerOneOnOneIDFK, questionIDFK) VALUES ('Si bien hubo momentos de presión, no me siento decepcionado y estoy enfocado en encontrar soluciones.', 2, 2);
INSERT INTO oneOnOneAnswer (answer, answerOneOnOneIDFK, questionIDFK) VALUES ('Me encuentro trabajando en la optimización de procesos internos y en la implementación de mejoras para el próximo trimestre.', 11, 3);
INSERT INTO oneOnOneAnswer (answer, answerOneOnOneIDFK, questionIDFK) VALUES ('Quiero concentrarme en perfeccionar mis habilidades técnicas y cumplir con los plazos establecidos en mis tareas.', 11, 4);
INSERT INTO oneOnOneAnswer (answer, answerOneOnOneIDFK, questionIDFK) VALUES ('Planeamos definir un plan de acción detallado, distribuir responsabilidades claramente y realizar seguimientos semanales para ajustar el rumbo si es necesario.', 18, 5);
INSERT INTO oneOnOneAnswer (answer, answerOneOnOneIDFK, questionIDFK) VALUES ('Sí, hubo un imprevisto en la coordinación del equipo, pero logramos resolverlo a tiempo con la colaboración de todos.', 6, 6);
INSERT INTO oneOnOneAnswer (answer, answerOneOnOneIDFK, questionIDFK) VALUES ('En general tengo lo necesario, aunque en algunas áreas podría beneficiarme de recursos adicionales para acelerar ciertos procesos.', 7, 7);
INSERT INTO oneOnOneAnswer (answer, answerOneOnOneIDFK, questionIDFK) VALUES ('La mayoría de las entregas están en línea con el cronograma, aunque se requieren pequeños ajustes en algunas tareas.', 1, 8);
INSERT INTO oneOnOneAnswer (answer, answerOneOnOneIDFK, questionIDFK) VALUES ('Quiero destacar el esfuerzo y la colaboración de todo el equipo, que ha sido fundamental para alcanzar los objetivos planteados.', 17, 9);
INSERT INTO oneOnOneAnswer (answer, answerOneOnOneIDFK, questionIDFK) VALUES ('Quiero destacar el esfuerzo y la colaboración de todo el equipo, que ha sido fundamental para alcanzar los objetivos planteados.', 6, 9);

-- Registros para oneOnOneMeasure (50 registros)
INSERT INTO oneOnOneMeasure (evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES (1, 1, 1);
INSERT INTO oneOnOneMeasure (evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES (2, 2, 2);
INSERT INTO oneOnOneMeasure (evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES (3, 3, 3);
INSERT INTO oneOnOneMeasure (evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES (4, 4, 4);
INSERT INTO oneOnOneMeasure (evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES (5, 5, 5);
INSERT INTO oneOnOneMeasure (evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES (1, 6, 6);
INSERT INTO oneOnOneMeasure (evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES (2, 7, 7);
INSERT INTO oneOnOneMeasure (evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES (3, 8, 8);
INSERT INTO oneOnOneMeasure (evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES (4, 9, 9);
INSERT INTO oneOnOneMeasure (evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES (5, 10, 10);
INSERT INTO oneOnOneMeasure (evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES (1, 11, 1);
INSERT INTO oneOnOneMeasure (evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES (2, 12, 2);
INSERT INTO oneOnOneMeasure (evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES (3, 13, 3);
INSERT INTO oneOnOneMeasure (evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES (4, 14, 4);
INSERT INTO oneOnOneMeasure (evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES (5, 15, 5);
INSERT INTO oneOnOneMeasure (evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES (1, 16, 6);
INSERT INTO oneOnOneMeasure (evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES (2, 17, 7);
INSERT INTO oneOnOneMeasure (evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES (3, 18, 8);
INSERT INTO oneOnOneMeasure (evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES (4, 19, 9);
INSERT INTO oneOnOneMeasure (evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES (5, 20, 10);
INSERT INTO oneOnOneMeasure (evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES (1, 21, 1);
INSERT INTO oneOnOneMeasure (evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES (2, 22, 2);
INSERT INTO oneOnOneMeasure (evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES (3, 23, 3);
INSERT INTO oneOnOneMeasure (evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES (4, 24, 4);
INSERT INTO oneOnOneMeasure (evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES (5, 25, 5);
INSERT INTO oneOnOneMeasure (evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES (1, 26, 6);
INSERT INTO oneOnOneMeasure (evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES (2, 27, 7);
INSERT INTO oneOnOneMeasure (evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES (3, 28, 8);
INSERT INTO oneOnOneMeasure (evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES (4, 29, 9);
INSERT INTO oneOnOneMeasure (evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES (5, 30, 10);
INSERT INTO oneOnOneMeasure (evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES (1, 31, 1);
INSERT INTO oneOnOneMeasure (evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES (2, 32, 2);
INSERT INTO oneOnOneMeasure (evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES (3, 33, 3);
INSERT INTO oneOnOneMeasure (evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES (4, 34, 4);
INSERT INTO oneOnOneMeasure (evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES (5, 35, 5);
INSERT INTO oneOnOneMeasure (evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES (1, 36, 6);
INSERT INTO oneOnOneMeasure (evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES (2, 37, 7);
INSERT INTO oneOnOneMeasure (evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES (3, 38, 8);
INSERT INTO oneOnOneMeasure (evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES (4, 39, 9);
INSERT INTO oneOnOneMeasure (evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES (5, 40, 10);
INSERT INTO oneOnOneMeasure (evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES (1, 41, 1);
INSERT INTO oneOnOneMeasure (evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES (2, 42, 2);
INSERT INTO oneOnOneMeasure (evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES (3, 43, 3);
INSERT INTO oneOnOneMeasure (evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES (4, 44, 4);
INSERT INTO oneOnOneMeasure (evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES (5, 45, 5);
INSERT INTO oneOnOneMeasure (evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES (1, 46, 1);
INSERT INTO oneOnOneMeasure (evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES (2, 47, 2);
INSERT INTO oneOnOneMeasure (evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES (3, 48, 3);
INSERT INTO oneOnOneMeasure (evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES (4, 49, 4);
INSERT INTO oneOnOneMeasure (evaluation, measureOneOnOneIDFK, measurableIDFK) VALUES (5, 40, 5);

-- Registros para fault (20 registros)
INSERT INTO fault (doneDate, summary, faultUserIDFK) VALUES ('2025-03-01', 'El empleado no se presenta al trabajo sin avisar o sin una razón válida, afectando la continuidad de las labores del equipo.', 58);
INSERT INTO fault (doneDate, summary, faultUserIDFK) VALUES ('2025-03-02', 'Llegar tarde de manera reiterada, lo cual puede generar problemas en la coordinación y en el flujo de trabajo.', 92);
INSERT INTO fault (doneDate, summary, faultUserIDFK) VALUES ('2025-03-03', 'No sigue las políticas o procedimientos establecidos por la empresa', 35);
INSERT INTO fault (doneDate, summary, faultUserIDFK) VALUES ('2025-03-04', 'Llegar tarde de manera reiterada, lo cual puede generar problemas en la coordinación y en el flujo de trabajo.', 40);
INSERT INTO fault (doneDate, summary, faultUserIDFK) VALUES ('2025-03-05', 'Llegar tarde de manera reiterada, lo cual puede generar problemas en la coordinación y en el flujo de trabajo.', 52);
INSERT INTO fault (doneDate, summary, faultUserIDFK) VALUES ('2025-03-06', 'El empleado no se presenta al trabajo sin avisar o sin una razón válida, afectando la continuidad de las labores del equipo.', 11);
INSERT INTO fault (doneDate, summary, faultUserIDFK) VALUES ('2025-03-07', 'No informar oportunamente sobre dificultades o retrasos que puedan afectar el cumplimiento de las metas, lo que impide tomar medidas preventivas.', 27);
INSERT INTO fault (doneDate, summary, faultUserIDFK) VALUES ('2025-03-08', 'El empleado no se presenta al trabajo sin avisar o sin una razón válida, afectando la continuidad de las labores del equipo.', 33);
INSERT INTO fault (doneDate, summary, faultUserIDFK) VALUES ('2025-03-09', 'No informar oportunamente sobre dificultades o retrasos que puedan afectar el cumplimiento de las metas, lo que impide tomar medidas preventivas.', 42);
INSERT INTO fault (doneDate, summary, faultUserIDFK) VALUES ('2025-03-10', 'El empleado no se presenta al trabajo sin avisar o sin una razón válida, afectando la continuidad de las labores del equipo.', 59);
INSERT INTO fault (doneDate, summary, faultUserIDFK) VALUES ('2025-03-11', 'Llegar tarde de manera reiterada, lo cual puede generar problemas en la coordinación y en el flujo de trabajo.', 15);
INSERT INTO fault (doneDate, summary, faultUserIDFK) VALUES ('2025-03-12', 'Llegar tarde de manera reiterada, lo cual puede generar problemas en la coordinación y en el flujo de trabajo.', 25);
INSERT INTO fault (doneDate, summary, faultUserIDFK) VALUES ('2025-03-13', 'No informar oportunamente sobre dificultades o retrasos que puedan afectar el cumplimiento de las metas, lo que impide tomar medidas preventivas.', 35);
INSERT INTO fault (doneDate, summary, faultUserIDFK) VALUES ('2025-03-14', 'No informar oportunamente sobre dificultades o retrasos que puedan afectar el cumplimiento de las metas, lo que impide tomar medidas preventivas.', 45);
INSERT INTO fault (doneDate, summary, faultUserIDFK) VALUES ('2025-03-15', 'No sigue las políticas o procedimientos establecidos por la empresa', 55);
INSERT INTO fault (doneDate, summary, faultUserIDFK) VALUES ('2025-03-16', 'No sigue las políticas o procedimientos establecidos por la empresa', 16);
INSERT INTO fault (doneDate, summary, faultUserIDFK) VALUES ('2025-03-17', 'Llegar tarde de manera reiterada, lo cual puede generar problemas en la coordinación y en el flujo de trabajo.', 22);
INSERT INTO fault (doneDate, summary, faultUserIDFK) VALUES ('2025-03-18', 'El empleado no se presenta al trabajo sin avisar o sin una razón válida, afectando la continuidad de las labores del equipo.', 30);
INSERT INTO fault (doneDate, summary, faultUserIDFK) VALUES ('2025-03-19', 'No sigue las políticas o procedimientos establecidos por la empresa', 41);
INSERT INTO fault (doneDate, summary, faultUserIDFK) VALUES ('2025-03-20', 'El empleado no se presenta al trabajo sin avisar o sin una razón válida, afectando la continuidad de las labores del equipo.', 51);

-- query para conocer los usuarios que les toco responder una pregunta en especifico.
SELECT u.birthName, u.surname 
FROM user AS u, oneOnOne AS one, oneOnOneAnswer AS oneA, oneOnOneQuestion AS oneQ
WHERE oneQ.questionID = oneA.questionIDFK
AND oneA.answerOneOnOneIDFK = one.oneOnOneID
AND one.oneOnOneID = u.userID
AND oneQ.questionID = 6;

-- query para conocer los usuarios que les toco asistir en un día especifico a un one on one
SELECT u.birthName, u.surname, one.meetingDate
FROM user AS u, oneOnOne AS one
WHERE one.oneOnOneUserIDFK = u.userID
AND one.meetingDate BETWEEN '2025-03-20 00:00:00' AND '2025-03-20 23:59:59';

-- query para conocer los valores que tuvo un usuario en especifico en su One on One
SELECT u.userID, u.birthName, u.surname, v.evaluation, des.summary
FROM user AS u, oneOnOne AS one, oneOnOneMeasure AS v, oneOnOneMeasurable AS des
WHERE u.userID = one.oneOnOneUserIDFK
AND one.oneOnOneID = v.measurableIDFK
AND des.measurableID = v.measureOneOnOneIDFK
AND u.userID = 30