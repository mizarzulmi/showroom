/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     18/03/2023 21:56:15                          */
/*==============================================================*/


drop table if exists DOK_MOBIL;

drop table if exists DOK_PEMESANAN;

drop table if exists FILE_DOK;

drop table if exists MEREK_MOBIL;

drop table if exists MOBIL;

drop table if exists PEMESANAN;

drop table if exists PENGGUNA;

drop table if exists PERAN;

drop table if exists PROFIL_PENGGUNA;

drop table if exists ROLE_PENGGUNA;

/*==============================================================*/
/* Table: DOK_MOBIL                                             */
/*==============================================================*/
create table DOK_MOBIL
(
   id_dok_mobil         varchar(36) not null,
   id_dok               varchar(36) not null,
   id_mobil             varchar(36) not null,
   create_date          datetime not null,
   last_update          datetime not null,
   soft_delete          numeric(1,0) not null,
   primary key (id_dok_mobil)
);

/*==============================================================*/
/* Table: DOK_PEMESANAN                                         */
/*==============================================================*/
create table DOK_PEMESANAN
(
   id_dok_pemesanan     varchar(36) not null,
   id_dok               varchar(36) not null,
   id_pemesanan         varchar(36) not null,
   create_date          datetime,
   last_update          datetime,
   soft_delete          numeric(1,0),
   primary key (id_dok_pemesanan)
);

/*==============================================================*/
/* Table: FILE_DOK                                              */
/*==============================================================*/
create table FILE_DOK
(
   id_dok               varchar(36) not null,
   nm_dok               varchar(60) not null,
   file_dok             longblob not null,
   url                  varchar(256),
   media_type           varchar(250) not null,
   create_date          datetime not null,
   last_update          datetime not null,
   soft_delete          numeric(1,0) not null,
   primary key (id_dok)
);

/*==============================================================*/
/* Table: MEREK_MOBIL                                           */
/*==============================================================*/
create table MEREK_MOBIL
(
   id_merek_mobil       varchar(36) not null,
   nm_merek             varchar(100) not null,
   create_date          datetime not null,
   last_update          datetime not null,
   soft_delete          numeric(1,0) not null,
   primary key (id_merek_mobil)
);

/*==============================================================*/
/* Table: MOBIL                                                 */
/*==============================================================*/
create table MOBIL
(
   id_mobil             varchar(36) not null,
   id_merek_mobil       varchar(36) not null,
   id_penjual           varchar(36) not null,
   model                varchar(150) not null,
   transmisi            varchar(50) not null,
   no_rangka            char(30) not null,
   no_mesin             char(20) not null,
   warna                varchar(20) not null,
   tahun                numeric(4,0) not null,
   no_plat              char(30),
   harga                numeric(20,0) not null,
   ket                  varchar(250),
   create_date          datetime not null,
   last_update          datetime not null,
   soft_delete          numeric(1,0) not null,
   primary key (id_mobil)
);

/*==============================================================*/
/* Table: PEMESANAN                                             */
/*==============================================================*/
create table PEMESANAN
(
   id_pemesanan         varchar(36) not null,
   id_mobil             varchar(36),
   id_pembeli           varchar(36) not null,
   status_pembelian     char(15) not null,
   harga_pembelian      numeric(20,0) not null,
   ket                  varchar(250),
   wkt_pembelian        datetime not null,
   create_date          datetime not null,
   last_update          datetime not null,
   soft_delete          numeric(1,0) not null,
   primary key (id_pemesanan)
);

/*==============================================================*/
/* Table: PENGGUNA                                              */
/*==============================================================*/
create table PENGGUNA
(
   id_pengguna          varchar(36) not null,
   username             char(60) not null,
   password             varchar(255) not null,
   a_aktif              numeric(1,0) not null,
   create_date          datetime not null,
   last_update          datetime not null,
   soft_delete          numeric(1,0) not null,
   primary key (id_pengguna)
);

/*==============================================================*/
/* Table: PERAN                                                 */
/*==============================================================*/
create table PERAN
(
   id_peran             int not null,
   nm_peran             varchar(50) not null,
   create_date          datetime not null,
   last_update          datetime not null,
   soft_delete          numeric(1,0) not null,
   primary key (id_peran)
);

/*==============================================================*/
/* Table: PROFIL_PENGGUNA                                       */
/*==============================================================*/
create table PROFIL_PENGGUNA
(
   id_profil            varchar(36) not null,
   id_pengguna          varchar(36) not null,
   nama_lengkap         varchar(100) not null,
   jk                   char(1) not null,
   tmpt_lahir           varchar(32),
   tgl_lahir            date,
   email                varchar(60),
   tlpn_hp              varchar(20) not null,
   alamat               varchar(255),
   nik                  char(20),
   create_date          datetime not null,
   last_update          datetime not null,
   soft_delete          numeric(1,0) not null,
   primary key (id_profil)
);

/*==============================================================*/
/* Table: ROLE_PENGGUNA                                         */
/*==============================================================*/
create table ROLE_PENGGUNA
(
   id_role_pengguna     varchar(36) not null,
   id_peran             int not null,
   id_pengguna          varchar(36) not null,
   create_date          datetime not null,
   last_update          datetime not null,
   soft_delete          numeric(1,0) not null,
   primary key (id_role_pengguna)
);

alter table DOK_MOBIL add constraint FK_FK_DOK_MOBIL foreign key (id_dok)
      references FILE_DOK (id_dok) on delete restrict on update restrict;

alter table DOK_MOBIL add constraint FK_FK_MOBI_DOK foreign key (id_mobil)
      references MOBIL (id_mobil) on delete restrict on update restrict;

alter table DOK_PEMESANAN add constraint FK_FK_DOK_PEMESANAN foreign key (id_dok)
      references FILE_DOK (id_dok) on delete restrict on update restrict;

alter table DOK_PEMESANAN add constraint FK_FK_PEMESANAN_DOK foreign key (id_pemesanan)
      references PEMESANAN (id_pemesanan) on delete restrict on update restrict;

alter table MOBIL add constraint FK_FK_MEREK_MOBIL foreign key (id_merek_mobil)
      references MEREK_MOBIL (id_merek_mobil) on delete restrict on update restrict;

alter table PEMESANAN add constraint FK_MOBIL_PEMESANAN foreign key (id_mobil)
      references MOBIL (id_mobil) on delete restrict on update restrict;

alter table PROFIL_PENGGUNA add constraint FK_FK_PENGGUNA_PROFIL foreign key (id_pengguna)
      references PENGGUNA (id_pengguna) on delete restrict on update restrict;

alter table ROLE_PENGGUNA add constraint FK_FK_PENGGUNA_ROLE foreign key (id_pengguna)
      references PENGGUNA (id_pengguna) on delete restrict on update restrict;

alter table ROLE_PENGGUNA add constraint FK_FK_PERAN_ROLE foreign key (id_peran)
      references PERAN (id_peran) on delete restrict on update restrict;

