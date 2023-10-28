const member_jkt48 = document.querySelector("#member .row");
const trainee_jkt48 = document.querySelector("#trainee .row");
const modal = document.querySelector("#item-detail-modal");

function show_anggota(m) {
     return `
    <section class="card card-member" id="anggota-jkt48" data-id="${m.id}">
     <div class="img-member">
          <img src="${m.img_thm}" alt="${m.full_name}" />
     </div>
     <div class="content-member">
          <h3>${m.full_name}</h3>
          <h3>${m.tanggal_lahir}</h3>
     </div>
    </section>`;
}

function show_detail_anggota(data) {
     return `<div class="modal-container">
               <a href="#" class="modal-close">
                    <img src="icons/x-solid.svg" alt="" srcset="" />
               </a>
               <div class="modal-content">
                    <div class="foto-member">
                         <img src="${data.img}" alt="Foto Member" />
                    </div>
                    <div class="member-content">
                         <div class="member-data">
                              <h3>Nama Member</h3>
                              <p>${data.full_name}</p>
                         </div>
                         <div class="member-data">
                              <h3>Nama Panggilan Member</h3>
                              <p>${data.nama_panggilan}</p>
                         </div>
                         <div class="member-data">
                              <h3>Tanggal Lahir</h3>
                              <p>${data.tanggal_lahir}</p>
                         </div>
                         <div class="member-data">
                              <h3>Jiko</h3>
                              <p>${data.jiko}</p>
                         </div>
                         <div class="member-data social-media">
                              <h3>Media Sosial</h3>
                              <div class="link">
                                   <a href="${data.media_sosial.instagram}" target="_blank"><img src="icons/instagram.svg" alt="Instagram" /></a>
                                   <a href="${data.media_sosial.tiktok}" target="_blank"><img src="icons/tiktok.svg" alt="Tiktok" /></a>
                                   <a href="${data.media_sosial.twitter}" target="_blank"><img src="icons/twitter.svg" alt="Twitter" /></a>
                              </div>
                         </div>
                    </div>
               </div>
          </div>`;
}

function getMember() {
     return fetch("data/member.json")
          .then((response) => {
               return response.json();
          })
          .then((response) => {
               return response.member;
          });
}

function getDataById(id) {
     return fetch("data/member.json")
          .then((response) => {
               return response.json();
          })
          .then((response) => {
               let mem = response.member;
               let cari = mem.find((item) => item.id === Number(id));
               if (cari) {
                    return cari;
               } else {
                    return "Not Found";
               }
          });
}

function anggota_member(data) {
     let cards_anggota = "";
     let cards_trainee = "";
     data.forEach((m) => {
          if (m.member === "member") {
               cards_anggota += show_anggota(m);
          } else if (m.member === "trainee") {
               cards_trainee += show_anggota(m);
          }
          member_jkt48.innerHTML = cards_anggota;
          trainee_jkt48.innerHTML = cards_trainee;
     });
}

async function load_member() {
     const data = await getMember();
     anggota_member(data);
}

load_member();

document.addEventListener("click", async function (e) {
     if (e.target.closest("section.card-member")) {
          let id = e.target.closest("section.card-member").getAttribute("data-id");
          let data = await getDataById(id);
          const md = await show_detail_anggota(data);
          modal.innerHTML = md;
          modal.style.display = "block";

          document.querySelector(".modal .modal-close").addEventListener("click", function (e) {
               modal.style.display = "none";
               e.preventDefault(e);
          });
     }
});
