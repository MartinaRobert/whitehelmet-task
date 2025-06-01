
// src/app/core/error-handler.interceptor.ts

import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

    constructor(private toastr: ToastrService, private router: Router) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                let errorMessage = 'An unknown error occurred!';

                if (error.error instanceof ErrorEvent) {
                    // Client-side or network error
                    errorMessage = `Error: ${error.error.message}`;
                    console.error('Client-side error:', error.error);
                } else {
                    // Server-side error
                    switch (error.status) {
                        case 400: // Bad Request
                            errorMessage = 'Bad Request: The request was invalid or could not be understood.';
                            if (error.error && error.error.errors) {
                                // Handle validation errors from backend
                                const validationErrors = Object.values(error.error.errors).flat().join('; ');
                                errorMessage += ` Details: ${validationErrors}`;
                            } else if (error.error && typeof error.error === 'string') {
                                errorMessage = error.error; // Backend might send a direct error string
                            }
                            break;
                        case 401: // Unauthorized
                            errorMessage = 'Unauthorized: You are not authorized to access this resource.';
                            this.router.navigate(['/login'])
                            // Redirect to login page or refresh token
                            break;
                        case 403: // Forbidden
                            errorMessage = 'Forbidden: You do not have permission to perform this action.';
                            break;
                        case 404: // Not Found
                            errorMessage = 'Not Found: The requested resource could not be found.';
                            break;
                        case 500: // Internal Server Error
                            errorMessage = 'Internal Server Error: Something went wrong on the server.';
                            if (error.error && typeof error.error === 'string') {
                                errorMessage = error.error;
                            }
                            break;
                        case 503: // Service Unavailable
                            errorMessage = 'Service Unavailable: The server is temporarily unable to handle the request.';
                            break;
                        default:
                            errorMessage = `Server Error (${error.status}): ${error.message || error.statusText}`;
                            break;
                    }
                    console.error(`Backend returned code ${error.status}, body was: `, error.error);
                }

                this.toastr.error(errorMessage);
               
                return throwError(() => new Error(errorMessage));
            })
        );
    }
}
