// import https from "https";
// import fs from "fs";
// import path from "path";
// import { NextResponse } from "next/server";

// export async function POST() {
//   try {
//     // Load client certificates
//     const certPath = path.resolve(__dirname, "../../../../../certs");
//     const clientOptions = {
//       key: fs.readFileSync(path.join(certPath, "client.key")),
//       cert: fs.readFileSync(path.join(certPath, "client.crt")),
//       ca: fs.readFileSync(path.join(certPath, "ca.crt")), // CA that signed the server certificate
//     };

//     // Configure request to the mTLS server
//     const requestOptions = {
//       hostname: "localhost",
//       port: 8000,
//       path: "/auth/mutualtls",
//       method: "POST",
//       ...clientOptions,
//     };

//     // Make a secure request to the server
//     return new Promise((resolve, reject) => {
//       const clientReq = https.request(requestOptions, (serverRes) => {
//         let data = "";
//         serverRes.on("data", (chunk) => {
//           data += chunk;
//         });

//         serverRes.on("end", () => {
//           resolve(NextResponse.json({ message: data }));
//         });
//       });

//       clientReq.on("error", (error) => {
//         console.error(error);
//         reject(
//           NextResponse.json(
//             { error: "Error connecting to server" },
//             { status: 500 }
//           )
//         );
//       });

//       clientReq.end();
//     });
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Server error" }, { status: 500 });
//   }
// }
