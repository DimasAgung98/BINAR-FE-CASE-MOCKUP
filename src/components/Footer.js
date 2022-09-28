import React from 'react';
import { FaGithub, FaLinkedin } from "react-icons/fa";

function Footer() {
    return (
        <footer class="mt-5">
            <div class="container px-4 px-lg-5">
                <div class="row justify-content-center">
                    <div class="col-md-10 col-lg-8 col-xl-7">
                        <ul class="list-icon text-center">
                            <li class="list-icon-item mx-2">
                                <a href="https://www.linkedin.com/in/dimasagungw98/">
                                    <span class="fa-stack fa-lg">
                                        <FaLinkedin size={50} color="black" />
                                    </span>
                                </a>
                            </li>
                            <li class="list-icon-item">
                                <a href="https://github.com/DimasAgung98">
                                    <span class="fa-stack fa-lg">
                                        <FaGithub size={50} color="black" />
                                    </span>
                                </a>
                            </li>
                        </ul>
                        <div class="small text-center text-muted fst-italic">Copyright &copy; Dimas Agung 2022</div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer